# Neonglass

Neonglass is a custom Unraid theme designed for use with the [Theme Engine](https://forums.unraid.net/topic/87126-plugin-theme-engine-a-webgui-styler/) plugin. It draws inspiration from the amazing [work](https://forums.unraid.net/topic/127365-unraid%E4%B8%BB%E9%A2%98%EF%BC%8C-%E8%87%AA%E5%AE%9A%E4%B9%89theme-%E8%83%A1%E6%A1%83%E5%8E%9F%E7%A5%9E/) of [@zisen](https://forums.unraid.net/profile/173690-zisen/).

This theme supports most plugins. However, certain elements (e.g., text areas like VM XML editing, CPU usage chart colors) are not currently themeable. If you encounter additional issues, feel free to submit an issue or pull request.

Neonglass comes in two versions: 
- **CSS Only**: Provides all theme styling through CSS.
- **CSS + JS**: Includes the following custom JavaScript:
  - **fan_mod.js**: If you use the [Dynamix System Temperature](https://forums.unraid.net/topic/34889-dynamix-v6-plugins/) plugin with fan speed shown on the dashboard, this script renames the fans (e.g., FAN 1 → CPU FAN 1).
  - **gpu_mod.js**: If you use the [GPU Statistics](https://forums.unraid.net/topic/89453-plugin-gpu-statistics/) plugin, this script removes the “PCI Bus Rx/Tx” row from the dashboard widget.

These JS mods are very specific to my personal setup but may serve as a reference for further modifications.

## How to Install

1. Install the [Theme Engine](https://forums.unraid.net/topic/87126-plugin-theme-engine-a-webgui-styler/) plugin from the Unraid Community App Store.  
2. Copy the link of the desired release from [here](https://github.com/tenasi/unraid-neonglass/releases).  
3. In Unraid, go to **Settings** → **Theme Engine**, then paste the link into the **From URL** field under **Import Zip**.  
4. Select **Neonglass** from your saved themes and click **Apply**.

## Editing the Theme and Installing Manually

You can either:

1. **Download and modify `style.css` directly:**  
   - Download `style.css` from this repository, make your changes, then in Unraid go to **Settings** → **Theme Engine** and select **Black** as your Base Theme.  
   - Under **Theme Settings**, enable **Advanced View**, set **Enable Theme Engine** and **Enable custom styling** to **Yes**, then paste your modified CSS into **Custom styling (advanced)** and click **Apply**.

2. **Clone this repo and use the toolchain:**  
   - Install Node.js and NPM.  
   - Clone this repository and run `npm install` to install dependencies.
   - Modify the files to your liking. ***Note**: If you add additional files in the `src` directory, make sure to include them in the `fileGroups` dictionary in the `build.js` file.*
   - Run the build script (`npm run build`) to minify and package all files from the `src` into the `dist` directory.  
   - Copy the resulting zip files to `config/plugins/theme.engine/themes` on your Unraid USB drive.  
   - In **Settings** → **Theme Engine**, select the file under **From USB** and click **Import**, then choose the theme under **Saved Themes** and click **Load**.  

Pull requests for additional JS mods or CSS updates are very much welcome.

## Screenshots

![Unraid Neonglass Theme Dashboard](screenshot01.png)  
![Unraid Neonglass Theme Main](screenshot02.png)  
![Unraid Neonglass Theme Settings](screenshot03.png)  
![Unraid Neonglass Theme VM Editor](screenshot04.png)  
![Unraid Neonglass Theme App Store](screenshot05.png)

## Known Issues

- Styling large text areas (e.g., VM XML, User Scripts, Plugin Install Popup)  
- NerdTools table  
- Chart line colors (e.g., CPU, network, system storage and memory)

## Future Plans

I plan to maintain this theme as long as I use Unraid. I’m also considering a standalone plugin that installs Neonglass without `theme-engine`, potentially offering additional configuration options. Any plugin creation expertise is greatly appreciated.
