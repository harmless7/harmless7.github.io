---
# 标题
title: 了解一下 js 上传库 —— filepond
# 描述
# description:
# 图标
icon: json
# 封面
# cover: https://s2.loli.net/2023/06/25/NJc5pHvAIQKxR8b.jpg
# 写作时间
date: 2024-05-23
# 分类（可多个）
category:
  - 技术学习
# 标签（可多个）
tag:
  - 工具
  - javascript
# 置顶
# sticky: true
# 收藏
# star: true
---

## 参考

[FilePond 文档（英文）](https://pqina.nl/filepond/docs/getting-started/installation/)

## 安装

```shell
npm install vue-filepond filepond --save
```

## 说明

官方支持原生js，以及各种常见框架。这里我主要记录 Vue 中使用的场景。

## 最小实例

```js
// 基础
import vueFilePond, { setOptions } from "vue-filepond";
import 'filepond/dist/filepond.min.css';

// 扩展
// 文件校验
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
// 图片预览
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// 汉化包
import zh_CN from "filepond/locale/zh-cn";

// 创建 FilePond 组件
const filePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
);

// 使用汉化
setOptions(zh_CN);
```

```html
<template>
    <file-pond
        label-idle="请 点击 或 拖拽文件 进行上传..."
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        :files="myFiles"
        @init="handleFilePondInit"
    />
</template>
```

## 属性

### 核心属性

| 属性名                | 类型                                      | 默认值                                         | 说明                                                                                                                                                         |
| ------------------ | --------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| element            | string \| DomElement                    | `null`                                      | FilePond 实例的根元素，该属性没有 setter。（vueFilePond 中不需要）                                                                                                            |
| status             | Number                                  | `0`                                         | 返回 FilePond 实例的当前状态。具体有：0: 为空; 1: 等待; 2: 错误; 3: 忙碌; 4: 所有文件已上传。没有 setter。                                                                                  |
| name               | string                                  | `"filepond"`                                | `<input type="file" />` 的 `name` 属性                                                                                                                        |
| className          | string                                  | `null`                                      | 要添加到根元素的其他 CSS 类                                                                                                                                           |
| required           | boolean                                 | `false`                                     | 是否必填                                                                                                                                                       |
| disabled           | boolean                                 | `false`                                     | 是否禁用                                                                                                                                                       |
| captureMethod      | "camera" \| "microphone" \| "camcorder" | `null`                                      | 设置 [capture](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/capture) 属性，如果设置了acceptedFileTypes，则必须使其与媒体通配符 “image/*”、“audio/*”或“video/*”匹配   |
| files              | `array<file>`                           | `[]`                                        | 用于回显的文件列表                                                                                                                                                  |
| allowDrop          | boolean                                 | `true`                                      | 是否支持拖放                                                                                                                                                     |
| allowBrowse        | boolean                                 | `true`                                      | 是否支持文件浏览器                                                                                                                                                  |
| allowPaste         | boolean                                 | `true`                                      | 是否支持粘贴文件。并非所有浏览器都支持粘贴文件。                                                                                                                                   |
| allowMultiple      | boolean                                 | `false`                                     | 是否支持添加多个文件                                                                                                                                                 |
| allowReplace       | boolean                                 | `true`                                      | 是否允许将文件拖放到其他文件上以替换它，仅当 `allowMultiple` 为 `false` 时有效                                                                                                       |
| allowRevert        | boolean                                 | `true`                                      | 是否允许"撤销                                                                                                                                                    |
| allowRemove        | boolean                                 | `true`                                      | 是否允许删除文件                                                                                                                                                   |
| allowProcess       | boolean                                 | `true`                                      | 是否在文件上传时，隐藏上传按钮                                                                                                                                            |
| allowReorder       | boolean                                 | `false`                                     | 是否允许用户通过拖放交互方式重新排列文件。（请注意，这仅适用于单列模式。它也只适用于支持指针事件的浏览器。）                                                                                                     |
| storeAsFile        | boolean                                 | `false`                                     | 告诉 FilePond 将文件存储在隐藏的 `<input>` 元素中，以便以普通的 form post 上传。（这只有在浏览器支持 DataTransfer 构造函数的情况下才会起作用，比如在 Firefox、Chrome 浏览器、支持 Chromium 的浏览器和 Safari 14.1 及更高版本。） |
| forceRevert        | boolean                                 | `false`                                     | 如果撤销失败，是否可重试。（如果为 `false`，即使 revert 请求失败，文件也会被删除）                                                                                                          |
| maxFiles           | integer                                 | `null`                                      | 最大上传文件数                                                                                                                                                    |
| maxParallelUploads | integer                                 | `2`                                         | 可同时上传的最大文件数                                                                                                                                                |
| checkValidity      | boolean                                 | `false`                                     | 是否自定义校验信息。如果提交的父表单中包含无效文件，FilePond 将抛出错误。                                                                                                                  |
| itemInsertLocation | "after" \| "before"                     | `"before"`                                  | 将文件添加在列表队首（before）或队尾（after）。                                                                                                                              |
| itemInsertInterval | integer                                 | `75`                                        | 文件显示到列表的延迟时间                                                                                                                                               |
| fileSizeBase       | integer                                 | `1000`                                      | 用于计算文件大小的基数，仅用于显示文件大小。                                                                                                                                     |
| credits            | `array<string>`                         | `['https://pqina.nl/', 'Powered by PQINA']` | 在页脚显示 Powered by PQINA                                                                                                                                     |

### 拖放

| 属性             | 类型            | 默认值                                         | 说明                                                                   |
| -------------- | ------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| dropOnPage     | boolean       | `false`                                     | 是否允许将文件拖放到页面上的任何位置（设置为 `false` 可防止浏览器打开被拖动文件）                        |
| dropOnElement  | boolean       | `true`                                      | 是否必须将文件拖放到组件上（如果设置为 `false` 且 `dropOnPage: false`，则拖动到页面上任何位置都会触发上传） |
| dropValidation | boolean       | `false`                                     | 是否在拖放前校验文件，校验不通过则不上传                                                 |
| ignoredFiles   | `array<string>` | `['.ds_store', 'thumbs.db', 'desktop.ini']` | 拖拽时忽略的文件名（拖进去也不触发上传）                                                 |

### 服务端

| 属性               | 类型                           | 默认值               | 说明                                |
| ---------------- | ---------------------------- | ----------------- | --------------------------------- |
| server           | object \| string \| function | `null`            | 服务器配置                             |
| instantUpload    | boolean                      | `true`            | 是否选中文件后立刻上传                       |
| chunkUploads     | boolean                      | `false`           | 是否启用分块上传，启用后将自动按 `chunkSize` 分割文件 |
| chunkForce       | boolean                      | `false`           | 是否在文件即使小于 `chunkSize`时，也会强制分块     |
| chunkSize        | integer                      | `5000000`         | 分块大小（以字节为单位                       |
| chunkRetryDelays | `array<integer>`             | [500, 1000, 3000] | 重试上传数据块的次数和延迟时间                   |

#### 关于服务端的配置

详见文档：[Easy File Uploading With JavaScript | FilePond (pqina.nl)](https://pqina.nl/filepond/docs/api/server/#revert)，这里进行一些简单总结。

在 filepond 中，与服务器的交互分为以下 7 个行为：

- 上传 process

- 分片上传 process chunks

- 撤销 revert （上传过程中，点击撤销）

- 恢复 restore （回显方法之一，用于恢复“临时文件”，file type 为 `limbo` 时调用）

- 回显 load （回显方法之二，用于恢复“已上传文件”，file type 为 `local` 时调用）

- 获取 fetch （通过 URL 或 HTML 字符串，GET）

- 删除 remove （默认不启用，只能设置为自定义方法）

##### 单 url

```javascript
const server = "./";
```

filepond 会默认该 url 下，能够调用这些方法：

| 方法      | 类型          | 路径             |
| ------- | ----------- | -------------- |
| process | POST        |                |
| revert  | DELETE      |                |
| load    | GET         | `?load=<source>` |
| restore | GET         | `?restore=<id>`  |
| fetch   | GET \| HEAD | `?fetch=<url>`   |
| patch   | PATCH       | `?patch=<id>`    |

##### 对象配置

可以单独设置某一种行为的路由，并禁用一些方法：

```javascript
const server = {
    process: './process',
    fetch: null,
    revert: null,
};
```

也可以为设置一个通用 url：

```javascript
const server = {
    url: "http: 192.168.0.100",
    process: "./process",
    revert: "./revert",
    restore: "./restore/",
    load: "./load/",
    fetch: "./fetch/",
};
```

或者对每个行为使用更复杂的配置：

```javascript
const server = {
    url: "http://192.168.0.100",
    process: {
        url: "./process",
        method: "POST",
        withCredentials: false,
        headers: {},
        timeout: 7000,
        onload: null,
        onerror: null,
        ondata: null,
    }
};
```

关于这些配置的详细如下：

| 属性              | 描述                                          | 是否必须 |
| --------------- | ------------------------------------------- | ---- |
| url             | 行为请求的路由                                     | √    |
| method          | 请求方法                                        | ×    |
| withCredentials | 打开或关闭带有凭证的 XMLHttpRequest                   | ×    |
| headers         | 请求头对象。或返回请求头对象的函数。                          | ×    |
| timeout         | 超时时间                                        | ×    |
| onload          | 收到响应时调用，响应中可获取唯一文件 ID                       | ×    |
| onerror         | 收到错误时调用，接收响应正文                              | ×    |
| ondata          | 在发送前使用 formdata 对象调用，返回扩展的 formdata 对象以进行更改 | ×    |

当然我们也可以将这些属性上提一层，它就将成为所有行为的公共属性。

##### 函数配置

###### 上传

```javascript
server: {
    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
        // fieldName 是 input 标签的字段名
        // file 是要发送的实际文件对象
        const formData = new FormData();
        formData.append(fieldName, file, file.name);

        const request = new XMLHttpRequest();
        request.open('POST', 'url-to-api');

        // 在调用 load 方法前，应该调用 progress 方法将进度更新为 100%
        // 将 computable 设为 false，会将 loading 设置为无限模式
        request.upload.onprogress = (e) => {
            progress(e.lengthComputable, e.loaded, e.total);
        };

        // Should call the load method when done and pass the returned server file id
        // 请求返回后应调用 load 方法，并传递返回的服务器文件 ID
        // this server file id is then used later on when reverting or restoring a file
        // 以后还原或恢复文件时，就会用到这个服务器文件 ID
        // so your server knows which file to return without exposing that info to the client
        // 这样，服务器就能知道要返回哪个文件，而不会向客户端透露该信息
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                // the load method accepts either a string (id) or an object
                // load 方法接受字符串（id）或对象
                load(request.responseText);
            } else {
                // Can call the error method if something is wrong, should exit after
                // 如果出错，可以调用 error 方法
                error('oh no');
            }
        };

        request.send(formData);

        // Should expose an abort method so the request can be cancelled
        // 应暴露一个 abort(中止) 方法，以便取消请求
        return {
            abort: () => {
                // This function is entered if the user has tapped the cancel button
                // 如果用户点击了取消按钮，会调用该方法
                request.abort();

                // Let FilePond know the request has been cancelled
                // 让 FilePond 知道请求已被取消
                abort();
            },
        };
    },
},
```

### 提示文本

| 属性                             | 类型     | 默认值                                                                                                                                             | 说明                                                                                |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| labelDecimalSeparator          | string | `undefined`                                                                                                                                     | 用于显示数字的小数分隔符。默认情况下会自动确定                                                           |
| labelThousandsSeparator        | string | `undefined`                                                                                                                                     | 用于显示数字的千位分隔符。默认情况下会自动确定                                                           |
| labelIdle                      | string | `'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>'`或`'拖放文件，或者 <span class="filepond--label-action"> 浏览 </span>'` | 显示的默认提示，表示这是一个拖拽上传区域。FilePond 会自动将浏览文件事件绑定到 CSS 类为 `.filepond--label-action` 的元素上 |
| labelInvalidField              | string | `'Field contains invalid files'`或`字段包含无效文件`                                                                                                     | 当字段包含无效文件，并通过父表单验证时显示的提示                                                          |
| labelFileWaitingForSize        | string | `'Waiting for size'`或`'计算文件大小'`                                                                                                                 | 等待文件大小信息时使用的提示                                                                    |
| labelFileSizeNotAvailable      | string | `'Size not available'`或`'文件大小不可用'`                                                                                                              | 未收到文件大小信息时使用的提示                                                                   |
| labelFileLoading               | string | `Loading`或`'加载'`                                                                                                                                | 加载文件时的提示                                                                          |
| labelFileLoadError             | string | `'Error during load'`或`'加载错误'`                                                                                                                  | 文件加载失败时的提示                                                                        |
| labelFileProcessing            | string | `'Uploading'`或`上传`                                                                                                                              | 文件上传时的提示                                                                          |
| labelFileProcessingComplete    | string | `'Upload complete'`或`'已上传'`                                                                                                                     | 上传完成时的提示                                                                          |
| labelFileProcessingError       | string | `'Error during upload'`或`'上传出错'`                                                                                                                | 取消上传时的提示                                                                          |
| labelFileProcessingRevertError | string | `'Error during revert'`或`'还原出错'`                                                                                                                | 撤销出现错误时提示                                                                         |
| labelFileRemoveError           | string | `'Error during remove'`或`'删除出错'`                                                                                                                | 删除出错提示                                                                            |
| labelTapToCancel               | string | `'tap to cancel'`或`'点击取消'`                                                                                                                      | 向用户表明可以点击取消操作的提示                                                                  |
| labelTapToRetry                | string | `'tap to retry'`或`'点击重试'`                                                                                                                       | 向用户表明可以点击重试的提示                                                                    |
| labelTapToUndo                 | string | `'tap to undo'` 或`'点击撤销'`                                                                                                                       | 向用户表名可以点击撤销的提示                                                                    |
| labelButtonRemoveItem          | string | `'Remove'`或`'删除'`                                                                                                                               | 删除提示                                                                              |
| labelButtonAbortItemLoad       | string | `'Abort'`或`'中止'`                                                                                                                                | 中止提示                                                                              |
| labelButtonRetryItemLoad       | string | `'Retry'`或`'重试'`                                                                                                                                | 重试提示                                                                              |
| labelButtonAbortItemProcessing | string | `'Cancel'`或`'取消'`                                                                                                                               | 取消提示                                                                              |
| labelButtonUndoItemProcessing  | string | `'Undo'`或`'撤销'`                                                                                                                                 | 撤销提示                                                                              |
| labelButtonRetryItemProcessing | string | `'Retry'`或`'重试'`                                                                                                                                | 重试提示                                                                              |
| labelButtonProcessItem         | string | `'Upload'`或`'上传'`                                                                                                                               | 上传按钮提示                                                                            |

### SVG 图标

| 属性          | 类型     | 默认值                | 说明   |
| ----------- | ------ | ------------------ | ---- |
| iconRemove  | string | `'<svg>...</svg>'` | 删除图标 |
| iconProcess | string | `'<svg>...</svg>'` | 上传图标 |
| iconRetry   | string | `'<svg>...</svg>'` | 重试图标 |
| iconUndo    | string | `'<svg>...</svg>'` | 撤销图标 |

### 回调

| 属性                                    | 说明                                                          |
| ------------------------------------- | ----------------------------------------------------------- |
| oninit()                              | FilePond 实例已创建并准备就绪。                                        |
| onwarning(error[, file, status])      | FilePond 实例会发出警告。例如，当达到最大文件数量时。如果错误与文件对象有关，可选择接收文件。         |
| onerror(error[, file, status])        | FilePond 实例抛出错误。如果错误与文件对象有关，可选择接收文件。                        |
| oninitfile(file)                      | 创建文件项目                                                      |
| onaddfilestart(file)                  | 开始加载文件                                                      |
| onaddfileprogress(file, progress)     | 上传文件时                                                       |
| onaddfile(error, file)                | 如果没有错误，说明文件已成功加载                                            |
| onprocessfilestart(file)              | 开始上传文件                                                      |
| onprocessfileprogress(file, progress) | 上传文件取得进展                                                    |
| onprocessfileabort(file)              | 文件上传失败                                                      |
| onprocessfilerevert(file)             | 撤销（删除）文件                                                    |
| onprocessfile(error, file)            | 如果没有错误，说明文件上传已完成                                            |
| onprocessfiles()                      | 当上传完列表中的所有文件时调用                                             |
| onremovefile(error, file)             | 文件已删除                                                       |
| onpreparefile(file, output)           | 文件已被 transform 插件或其他订阅 prepare_output 过滤器的插件转换。它接收文件项和输出数据。 |
| onupdatefiles(files)                  | 添加或删除文件，接收文件项目列表                                            |
| onactivatefile(file)                  | 点击或轻触文件时调用                                                  |
| onreorderfiles(files, origin, target) | 当文件列表重新排序时调用，接收当前文件列表（重新排序）以及文件来源和目标索引。                     |

### 钩子

| 属性                     | 说明                                                                 |
| ---------------------- | ------------------------------------------------------------------ |
| beforeDropFile(file)   | FilePond 将允许丢弃此项目，它可以是一个 URL 或文件对象。返回 true 或 false 取决于您是否允许下拉该项目。  |
| beforeAddFile(item)    | FilePond 即将添加此文件，返回 false 表示阻止添加，或返回 Promise 并用 true 或 false 进行解析。 |
| beforeRemoveFile(item) | FilePond 即将删除此文件，返回 false 表示阻止删除，或返回 Promise 并用 true 或 false 进行解析。 |

### 样式

| 属性                             | 类型                                        | 默认值       | 说明                                                                                                                                   |
| ------------------------------ | ----------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| stylePanelLayout               | "integrated" \| "compact" \| "circle"     | `null`    | 设置不同的布局渲染模式。可以是 integrated "集成"、compact "紧凑 "和/或 circle "圆形"。紧凑模式将移除填充，集成模式用于将 FilePond 呈现为更大元素的一部分。圆形模式会调整项目位置偏移，使按钮和进度指示器不会落在圆形之外。 |
| stylePanelAspectRatio          | string \| number                          | `null`    | 为 FilePond 下拉区域设置强制宽高比。这对使下拉区域占据固定的空间非常有用。例如在裁剪单个正方形图像时。可接受 "1:1 "等人类可读的纵横比或 0.75 等数字纵横比。                                            |
| styleButtonRemoveItemPosition  | 'left' \| 'center' \| 'right' \| 'bottom' | `'left'`  | 移除项目按钮的位置，"左"、"中"、"右 "和/或 "底"。                                                                                                       |
| styleButtonProcessItemPosition | 'left' \| 'center' \| 'right' \| 'bottom' | `'right'` | 流程项目按钮的位置，"左"、"中"、"右 "和/或 "底"。                                                                                                       |
| styleLoadIndicatorPosition     | 'left' \| 'center' \| 'right' \| 'bottom' | `'right'` | load 标识的位置，"左"、"中"、"右 "和/或 "底"。                                                                                                      |
| styleProgressIndicatorPosition | 'left' \| 'center' \| 'right' \| 'bottom' | `'right'` | 进度指示器的位置，"左"、"中"、"右 "和/或 "底"。                                                                                                        |
| styleItemPanelAspectRatio      | string \| number                          | `null`    | 为文件项目设置强制宽高比。这在网格视图中渲染裁剪或固定宽高比图像时非常有用，因为 FilePond 会事先知道要渲染的项目大小，从而提高性能。                                                              |

### 关于 `files`

你可以使用 `files` 属性，将一组初始文件填充到 FilePond 中。该属性适用于恢复早期的临时上传或已上传文件。

但是，虽然 `files` 属性可以填充新文件，但建议只使用 `addFile` 和 `addFiles` 方法添加文件。

`files` 属性接收一个文件引用数组，接收的格式与 `addFile` 方法相同。

- 本地和远程 URL 

- DataURLs

- Blob 或文件对象

它通过这些选项来添加服务器端文件。

#### 添加临时服务器文件

`limbo` 类型将把加载请求，导向 `restore`。

```javascript
const pond = FilePond.create({
    files: [
        {
            // 服务器文件标记
            source: '12345',

            // 设置 limbo 类型，告诉 FilePond 这是一个临时文件
            options: {
                type: 'limbo',
            },
        },
    ],
});
```

#### 添加已上传的服务器文件

`local` 类型将把加载请求导向 `load`。

```javascript
const pond = FilePond.create({
    files: [
        {
            // 服务器文件标记
            source: '12345',

            // 设置 local 类型，表明这是一个已上传文件
            options: {
                type: 'local',
            },
        },
    ],
})
```

#### 添加文件信息

您也可以通过在 `options` 对象中提供文件信息来模拟文件，这些信息与 FilePond 从服务器获取的信息相同。FilePond 现在会创建一个模拟文件项，但不会请求文件数据。

```javascript
const pond = FilePond.create({
    files: [
        {
            // 服务器文件标记
            source: '12345',

            // 设置 local 类型，表明这是一个已上传文件
            options: {
                type: 'local',

                // 模拟文件信息
                file: {
                    name: 'my-file.png',
                    size: 3001025,
                    type: 'image/png',
                },
            },
        },
    ],
});
```

> 请注意，这会影响插件渲染或处理文件的方式，因为没有实际的文件数据。

#### 设置文件元信息

如果您想为已加载的文件提供初始元数据（可使用文件项上的 `setMetadata` 和 `getMetadata` 访问），可以使用 `metadata` 属性来实现。下面的示例将在 FilePond 文件项元数据对象中，创建一个 `date` 条目。

```javascript
const pond = FilePond.create({
    files: [
        {
            // 服务器文件标记
            source: '12345',

            // 设置 local 类型，表明这是一个已上传文件
            options: {
                type: 'local',

                // 初始化文件元信息
                metadata: {
                    date: '2018-10-5T12:00',
                },
            },
        },
    ],
});

// 获取第一个文件的数据
const date = pond.getFile().getMetadata('date');
```

## 方法

### 基础

| 方法                           | 说明                                                                        |
| ---------------------------- | ------------------------------------------------------------------------- |
| setOptions(object)           | 一次覆盖多个选项                                                                  |
| addFile(source [, options])  | 添加一个文件                                                                    |
| addFiles(source [, options]) | 添加多个文件                                                                    |
| removeFile(query)            | 删除与给定查询匹配的文件                                                              |
| removeFiles([query])         | 删除所有文件或与查询匹配的文件                                                           |
| processFile(query)           | 开始上传与给定查询匹配的文件                                                            |
| processFiles([query])        | 开始上传与查询匹配的所有文件                                                            |
| prepareFile(query)           | 开始准备与给定查询匹配的文件，返回一个 Promise，该 Promise 返回含有文件项和输出文件的对象（{ file, output }）   |
| prepareFiles([query])        | 开始准备与给定查询匹配的所有文件，返回一个 Promise，该 Promise 返回含有文件项和输出文件的对象（{ file, output }） |
| getFile(query)               | 返回与所提供查询匹配的文件                                                             |
| getFiles()                   | 返回所有文件                                                                    |
| browse()                     | 打开浏览文件对话框，请注意，只有在用户启动了调用堆栈并最终调用了浏览方法时，该对话框才会起作用。                          |
| sort(compare)                | 使用提供的比较函数对列表中的文件进行排序                                                      |
| moveFile(query, index)       | 在列表中将文件移动到新的 index                                                        |
| destroy()                    | 销毁 FilePond 实例                                                            |

#### 添加文件

使用 `addFile` 和 `addFiles` 添加文件。

这两个方法都接受以下文件引用：

- 本地和远程 URL

- DataURLs

- Blob 或文件对象

```javascript
// 添加单个文件
pond.addFile("./my-file.jpg");

// 添加多个文件
pond.addFile("./my-file.jpg", "./my-documents.zip");

// 也可以传入数组
pond.addFiles(["./my-file.jpg", "./my-documents.zip"]);
```

最后一个参数可以设置为一个选项对象，用于确定文件应添加到项目列表中的哪个索引。

```javascript
// 使用选项对象添加单个文件
pond.addFile('./my-file.jpg', { index: 0 });

// 使用选项对象添加多个文件
pond.addFiles('./my-file.jpg', './my-documents.zip', { index: 0 });

// 使用选项对象以数组形式添加文件
pond.addFiles(['./my-file.jpg', './my-documents.zip'], { index: 0 });
```

如前所述，`addFile` 方法也接受 Blobs、文件对象和 DataURL。

```javascript
// 添加基本的 base64 编码 DataURL
pond.addFile('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==');

// 添加 Blob 或文件
const data = { hello: 'world' };
const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
});
pond.addFile(blob);
```

> 由于 Blobs 和 DataURL 不提供任何文件名信息，因此 FilePond 会将文件名设置为当前日期。

`addFile` 方法会返回一个 `Promise`。这在加载远程文件时非常有用。

```javascript
pond.addFile('./my-file.jpg')
    .then((file) => {
        // 已添加文件
    })
    .catch((error) => {
        // 出问题了
    });
```

#### 处理文件

我们可以使用 `processFile` 方法触发文件的手动处理。

文件可以通过 `id`、`index` 或 `file` 进行处理。参数非必须。

```javascript
// 处理第一个文件
pond.processFile().then((file) => {
    // 文件已处理
});

// 删除索引为 1 的文件
pond.processFile(1).then((file) => {
    // 文件已处理
});

// 删除指定 id 的文件
pond.processFile('imzsdvxar').then((file) => {
    // 文件已处理
});
```

可以通过向 `processFiles` 方法传递多个项目来处理多个文件。

```javascript
pond.processFiles('imzsdvxar', 'afaoiwles').then((files) => {
    // 文件已处理
});
```

处理所有文件：

```javascript
pond.processFiles().then((files) => {
    // 文件已处理
});
```

#### 获取文件

```javascript
// 获取第一个文件
pond.getFile();

// 获取下标为 1 的文件
pond.getFile(1);

// 获取特定 id 的文件
pond.getFile("imzsdvxar");

// 获取所有文件列表
pond.getFiles();
```

#### 删除文件

```javascript
// 删除第一个文件
pond.removeFile();

// 删除下标为 1 的文件
pond.removeFile(1);

// 删除特定 id 的文件
pond.removeFile('imzsdvxar');

// 使用 FilePond 文件对象移除
pond.addFile('./my-file.jpg').then((file) => {
    pond.removeFile(file);
});

// removeFile 和 removeFiles 可以接受第二个参数，用来 revert （恢复）上传
pond.removeFile({ revert: true });

// 特定 id 恢复上传
pond.removeFile('imzsdvxar', { revert: true });

// 重传所有文件
pond.removeFiles({ revert: true });
```

> FilePond file 对象与 JavaScript file 或 Blob 不同。FilePond file 是 JavaScript 文件对象的包装。向 removeFile 方法传递 JavaScript file 或 Blob 将不起作用。

#### 唤起文件选择器

只有当调用来自用户时，该方法才会起作用。

```javascript
document.querySelector('button').addEventListener('click', () => {
    pond.browse();
});
```

#### 文件排序

```javascript
// 插入时默认排序
const pond = FilePond.create({
    itemInsertLocation: (a, b) => {
        // 如果还没有文件数据，则视为相等
        if (!(a.file && b.file)) return 0;

        // 移动到列表中的正确位置
        if (a.fileSize < b.fileSize) {
            return -1;
        } else if (a.fileSize > b.fileSize) {
            return 1;
        }

        return 0;
    },
});


// 手动进行排序
pond.sort((a, b) => {
    if (!(a.file && b.file)) return 0;

    if (a.fileSize < b.fileSize) {
        return -1;
    } else if (a.fileSize > b.fileSize) {
        return 1;
    }

    return 0;
});
```



### 监听事件

| 方法                | 说明                       |
| ----------------- | ------------------------ |
| on(event, fn)     | 监听带有名称的事件，并在事件触发时运行 `fn` |
| onOnce(event, fn) | `fn` 处理程序只会被调用一次，然后会自动删除 |
| off(event, fn)    | 删除带有处理程序 `fn` 的事件        |

### 插入 Dom

| 方法                      | 说明                              |
| ----------------------- | ------------------------------- |
| insertAfter(element)    | 在提供的元素后插入 FilePond 实例           |
| insertBefore(element)   | 在提供的元素前插入 FilePond 实例           |
| appendTo(element)       | 将 FilePond 追加到给定元素              |
| isAttachedTo(element)   | 如果当前实例附加到所提供的元素，则返回 `true`      |
| replaceElement(element) | 用 FilePond 替换所提供的元素             |
| restoreElement(element) | 如果 FilePond 替换了原始元素，这将恢复原始元素的原貌 |

### 事件

| 事件                           | 说明                                                          |
| ---------------------------- | ----------------------------------------------------------- |
| FilePond:init                | FilePond 实例已创建并准备就绪。                                        |
| FilePond:warning             | FilePond 实例会发出警告。例如，当达到最大文件数量时。如果错误与文件对象有关，可选择接收文件。         |
| FilePond:error               | FilePond 实例抛出错误。如果错误与文件对象有关，可选择接收文件。                        |
| FilePond:initfile            | 创建文件项。                                                      |
| FilePond:addfilestart        | 开始加载文件。                                                     |
| FilePond:addfileprogress     | 加载文件取得进展。                                                   |
| FilePond:addfile             | 文件已加载，如果详细信息对象包含错误属性，则说明出了问题。                               |
| FilePond:processfilestart    | 开始处理文件。                                                     |
| FilePond:processfileprogress | 文件处理取得进展。                                                   |
| FilePond:processfileabort    | 文件处理失败。                                                     |
| FilePond:processfilerevert   | 已恢复对文件的处理。                                                  |
| FilePond:processfile         | 完成文件处理，如果详细信息对象包含错误属性，则说明出错了。                               |
| FilePond:processfiles        | 已处理列表中的所有文件。                                                |
| FilePond:removefile          | 文件已删除。                                                      |
| FilePond:preparefile         | 文件已被 transform 插件或其他订阅 prepare_output 过滤器的插件转换。它接收文件项和输出数据。 |
| FilePond:updatefiles         | 文件已添加或删除                                                    |
| FilePond:activatefile        | 点击或轻触文件时触发                                                  |
| FilePond:reorderfiles        | 当文件列表重新排序时触发，接收当前文件列表（重新排序）以及文件来源和目标索引。                     |
