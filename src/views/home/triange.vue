<template>
  <!-- <h1>home</h1>  
    <svg-icon name="Jim's_set"></svg-icon> -->
  <canvas></canvas>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import basicVert from "@/assets/webgpu/shaders_my_rotate/basic.vert.wgsl?raw";
import positionFrag from "@/assets/webgpu/shaders_my_rotate/position.frag.wgsl?raw";
import * as cube from "@/assets/webgpu/util_my_rotate/cube";
import { getMvpMatrix } from "@/assets/webgpu/util/math";

// initialize webgpu device & config canvas context
async function initWebGPU(canvas: HTMLCanvasElement) {
  console.log(navigator);

  if (!navigator.gpu) throw new Error("Not Support WebGPU");
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error("No Adapter Found");
  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu") as GPUCanvasContext;
  const format = navigator.gpu.getPreferredCanvasFormat();
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  const size = { width: canvas.width, height: canvas.height };
  context.configure({
    device,
    format,
    // prevent chrome warning after v102
    alphaMode: "opaque",
  });
  return { device, context, format, size };
}

// create pipiline & buffers  也就是shader
async function initPipeline(
  device: GPUDevice,
  format: GPUTextureFormat,
  size: { width: number; height: number }
) {
  //createRenderPipelineAsync异步创建渲染管道
  const pipeline = await device.createRenderPipelineAsync({
    label: "Basic Pipline",
    layout: "auto",
    vertex: {
      module: device.createShaderModule({
        code: basicVert,
      }),
      entryPoint: "main",
      buffers: [
        {
          arrayStride: 5 * 4, // 3 position 2 uv,
          attributes: [
            // 传入了两个数组，也就是传入shader的数据也发生了变化，相应的，wsgl文件里也要更改写法
            {
              // position
              shaderLocation: 0,
              offset: 0,
              format: "float32x3",
            },
            {
              // uv
              shaderLocation: 1,
              offset: 3 * 4,
              format: "float32x2",
            },
          ],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({
        code: positionFrag,
      }),
      entryPoint: "main",
      targets: [
        {
          format: format,
        },
      ],
    },
    primitive: {
      topology: "triangle-list",
      // Culling backfaces pointing away from the camera
      cullMode: "back",
      frontFace: "ccw",
    },
    // Enable depth testing since we have z-level positions
    // Fragment closest to the camera is rendered in front
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: "less",
      format: "depth24plus",
    },
  } as GPURenderPipelineDescriptor);

  // create depthTexture for renderPass
  // 纹理 || GPUTextures 是通过创建 GPUDevice.createTexture(descriptor) 返回的一个新的纹理。
  const depthTexture = device.createTexture({
    size,
    format: "depth24plus",
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });
  const depthView = depthTexture.createView(); // 创建一个 GPUTextureView.

  // create vertex buffer
  // GPUDevice.createBuffer():
  //      1.在内容时间线上，用户填写一个 GPUBufferDescriptor，并用它创建一个 GPUBuffer。
  //      2.用户代理在设备时间线上创建一个低级缓冲区。
  const vertexBuffer = device.createBuffer({
    label: "GPUBuffer store vertex",
    size: cube.vertex.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  // GPUQueue 有以下方法:
  // 其实是将cpu的数据拷贝给GPU
  // writeBuffer(buffer, bufferOffset, data, dataOffset, size)将提供的数据写入 GPUBuffer。
  device.queue.writeBuffer(vertexBuffer, 0, cube.vertex);
  // create a mvp matrix buffer
  const mvpBuffer = device.createBuffer({
    label: "GPUBuffer store 4x4 matrix",
    size: 4 * 4 * 4, // 4 x 4 x float32
    //[[usage]] of type GPUBufferUsageFlags.此 GPUBuffer 被允许的使用。
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  // create a uniform group for Matrix
  // GPUBindGroupLayout 是通过 GPUDevice.createBindGroupLayout() 创建的。
  // GPUBindGroupLayoutEntry 描述了要包含在 GPUBindGroupLayout 中的单个着色器资源绑定。
  const uniformGroup = device.createBindGroup({
    label: "Uniform Group with Matrix",
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: mvpBuffer,
        },
      },
    ],
  });
  // return all vars
  return {
    pipeline,
    vertexBuffer,
    mvpBuffer,
    uniformGroup,
    depthTexture,
    depthView,
  };
}

// create & submit device commands
function draw(
  device: GPUDevice,
  context: GPUCanvasContext,
  pipelineObj: {
    pipeline: GPURenderPipeline;
    vertexBuffer: GPUBuffer;
    mvpBuffer: GPUBuffer;
    uniformGroup: GPUBindGroup;
    depthView: GPUTextureView;
  }
) {
  // start encoder
  // 创建一个 GPUCommandEncoder(Encoder对象)，编码一条清理缓存的命令，结束编码器以得到 GPUCommandBuffer，之后提交其至 GPUQueue。
  // 所有命令写到Encoder中，再一次性交给nativa
  const commandEncoder = device.createCommandEncoder();
  // 要创建的GPURenderPassEncoder的描述。
  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(), // 最终绘制到画布上
        clearValue: { r: 0, g: 0, b: 0, a: 1.0 },
        loadOp: "clear",
        storeOp: "store", // 绘制完成后，是否保留结果
      },
    ],
    depthStencilAttachment: {
      view: pipelineObj.depthView,
      depthClearValue: 1.0,
      depthLoadOp: "clear",
      depthStoreOp: "store",
    },
  };
  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(pipelineObj.pipeline);
  // set vertex
  passEncoder.setVertexBuffer(0, pipelineObj.vertexBuffer);
  // set uniformGroup
  passEncoder.setBindGroup(0, pipelineObj.uniformGroup);
  // draw vertex count of cube
  passEncoder.draw(cube.vertexCount); // 运行管线
  passEncoder.end();
  // webgpu run in a separate process, all the commands will be executed after submit
  // commandEncoder.finish()会返回一个buffer，由device.queue.submit提交给Dawn,Dawn会在浏览器每部真正操作GPU
  device.queue.submit([commandEncoder.finish()]);
}

async function run() {
  const canvas = document.querySelector("canvas");
  if (!canvas) throw new Error("No Canvas");
  const { device, context, format, size } = await initWebGPU(canvas);
  const pipelineObj = await initPipeline(device, format, size);
  console.log(pipelineObj);

  // default state
  let aspect = size.width / size.height;
  const position = { x: 0, y: 0, z: -6 };
  const scale = { x: 1, y: 1, z: 1 };
  const rotation = { x: 0, y: 0, z: 0 };
  draw(device, context, pipelineObj);
  // start loop
  function frame() {
    // rotate by time, and update transform matrix
    const now = Date.now() / 1000;
    rotation.x = Math.sin(now);
    rotation.y = Math.cos(now);
    const mvpMatrix = getMvpMatrix(aspect, position, rotation, scale);
    // console.log(mvpMatrix);

    device.queue.writeBuffer(pipelineObj.mvpBuffer, 0, mvpMatrix.buffer);
    // then draw
    draw(device, context, pipelineObj);
    requestAnimationFrame(frame);
  }
  frame();

  // re-configure context on resize
  window.addEventListener("resize", () => {
    size.width = canvas.width = canvas.clientWidth * devicePixelRatio;
    size.height = canvas.height = canvas.clientHeight * devicePixelRatio;
    // don't need to recall context.configure() after v104
    // re-create depth texture
    pipelineObj.depthTexture.destroy();
    pipelineObj.depthTexture = device.createTexture({
      size,
      format: "depth24plus",
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
    pipelineObj.depthView = pipelineObj.depthTexture.createView();
    // update aspect
    aspect = size.width / size.height;
  });
}

onMounted(() => {
  run();
});
</script>
<script lang="ts">
export default {
  name: "Home",
};
</script>

<style scoped lang="scss"></style>
