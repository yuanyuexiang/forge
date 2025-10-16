# 提示音文件说明

## 文件要求

请在此目录放置一个名为 `notification.mp3` 的音频文件作为新订单提示音。

### 推荐规格：
- 格式：MP3
- 时长：1-3 秒
- 音量：适中（建议不超过 -6dB）
- 文件大小：< 50KB

### 示例音效来源：
1. [Freesound](https://freesound.org/) - 免费音效库
2. [Zapsplat](https://www.zapsplat.com/) - 免费音效下载
3. [Mixkit](https://mixkit.co/free-sound-effects/) - 免费音效

### 推荐搜索关键词：
- notification
- alert
- ding
- chime
- bell

## 备选方案

如果没有音频文件，系统会自动跳过播放，不会影响其他功能的使用。

## 文件路径

```
public/sounds/notification.mp3
```

系统会自动从 `/sounds/notification.mp3` 路径加载音频文件。
