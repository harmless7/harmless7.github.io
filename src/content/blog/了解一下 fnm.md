---
title: '了解一下 fnm'
description: none
pubDate: '2024-09-23'
---

## 什么是 fnm

即 Fast Node Manager，一个快速简单的 Node.js 版本管理工具，使用 Rust 开发。

原本使用 `nvm`，但是发现 node 官方似乎更推荐使用 `fnm`。

![node download page](https://s2.loli.net/2024/09/23/VR5FilSYO4hXcnE.jpg)

在 `fnm` 官方能看到它的一些优势：

- 🌎 跨平台 (macOS, Windows, Linux)

- ✨ 单文件, 易安装, 启动快

- 🚀 速度至上

- 📂 适用 `.node-version` 或 `.nvmrc` 文件

> 本文只记录 Windows 环境下的相关使用，其他环境详见官方 git。

## 安装

Windows 环境下，最方便的是使用 `Winget` 进行安装。打开命令行，输入：

```bash
winget install Schniz.fnm
```

安装完会自动配置环境变量，可打开一个命令行使用 `fnm -h` 命令，如有相关提示则安装成功。

> 关于 `Winget`：微软自带的 Windows 程序包管理器服务。可在 Win11 及 Win10 较新版本中使用，详见：[使用 WinGet 工具安装和管理应用程序](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)

## 基础使用

- `list-remote`（`ls-remote`）：查看远程所有可下载的 Node.js 版本

- `list`（`ls`）：查看所有本地已下载的 Node.js 版本

- `install`：安装一个 Node.js 版本，`--latest` 安装最新版本

- `use`：切换到指定版本

- `env`：打印 fnm 的环境变量

  1. `FUM_DIR`: Node.js 的安装路径（默认：C:\Users\YOUR_USER_NAME\AppData\Roaming\fnm）
  2. `FNM_NODE_DIST_MIRROR`：Node.js 安装远程镜像（默认："https://nodejs.org/dist"）

- `current`：查看当前使用版本

- `uninstall`: 卸载指定版本

- `default`：将特定版本设置为默认

> 如何指定安装目录：
>
> 添加或修改系统环境变量 `FNM_DIR` 为你的安装目录，重启控制台使用 `fnm env` 可看到安装路径已改变。
>
> 安装后目录下会生成 `node-versions` 和 `aliases` 两个文件夹。

## 根据目录自动切换版本

之前使用 `nvm` 时，不同项目下经常 `nvm use xxx` 手动切换版本。麻烦又容易忘记。

`nfm` 可以在不同目录下，读取配置文件，自动切换到对应版本。

通过 `--use-on-cd` 配置，将在更改目录时挂钩到您的 shell 中，并将根据当前目录的要求切换 Node.js 版本，基于 `.node-version` 或 `.nvmrc`（或 `packages.json#engines#node`，如果 `--resolve-engines` 已启用）。

这需要你在项目下生成版本文件，并且给 Shell 配置自动化脚本。

### 项目目录生成版本文件

```bash
node --version > .node-version
```

### Power Shell（vscode 终端及 Windows 终端）

#### 1. 创建配置文件

默认情况下，Power Shell 配置文件需要你自己创建。

通过以下命令，可以查看所有 PowerShell 配置文件的路径。

```PowerShell
$PROFILE | Select-Object *
```

然后可以通过以下命令，查看本机上是否创建了“所有用户，所有主机”的配置文件：

```PowerShell
Test-Path -Path $PROFILE.AllUsersAllHosts
```

创建配置文件命令（当前用户，当前主机），可以直接在命令行输入执行：

```PowerShell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
```

#### 2. 添加脚本

可以通过以下命令，通过记事本打开配置文件：

```PowerShell
notepad $profile
```

然后将以下脚本粘贴进去：

```PowerShell
fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression
```

### Window 命令提示符（CMD）

#### 1. 编写脚本

```sh
@echo off
:: for /F will launch a new instance of cmd so we create a guard to prevent an infnite loop
if not defined FNM_AUTORUN_GUARD (
    set "FNM_AUTORUN_GUARD=AutorunGuard"
    FOR /f "tokens=*" %%z IN ('fnm env --use-on-cd') DO CALL %%z
)
```

创建 `.cmd` 文件，将以上内容复制进去。

#### 2. 配置注册表

参考 [Is there windows equivalent to the .bashrc file in linux?](https://superuser.com/questions/144347/is-there-windows-equivalent-to-the-bashrc-file-in-linux/144348#144348) 的方法，修改注册表来让 cmd 每次启动时都运行脚本。

打开注册表 `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor`，在右侧新增一个字符值 `AutoRun`，并将其值设置为你上述脚本 `.cmd` 文件的路径。

重启命令行即可。

## 相关链接

[fnm](fnm.vercel.app)

[使用 WinGet 工具安装和管理应用程序](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)

[介绍如何创建和使用 PowerShell 配置文件](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.4)