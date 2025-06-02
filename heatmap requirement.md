```markdown
# 🔥 Home Assistant Heatmap Card - 需求说明文档

本项目旨在开发一个自定义的 Home Assistant Lovelace 卡片，用于在背景图上渲染基于传感器数据的热力图。支持丰富的配置选项，包括背景图设置、热力点位置与数值、动态更新、颜色渐变、图例等。

---

## ✨ 功能总览

- 📷 支持 PNG / JPG / SVG 背景图
- 🔥 基于 heatmap.js 的热力图渲染
- 🧩 实时绑定 Home Assistant 实体值
- 🔁 可配置自动更新频率（单位秒）
- 🎨 自定义颜色渐变
- 📈 自动缩放热力范围（Auto-Scaling）
- 💬 鼠标悬停显示数值 Tooltip
- 📊 支持图例栏 Legend
- 📱 响应式缩放，适配多种设备屏幕
- 🛡️ 错误处理和加载状态显示

---

## 🧾 配置示例（YAML）

```yaml
type: custom:heatmap-card
background: /local/house.svg  # 必需
width: 400                    # 可选，默认自适应
height: 300                   # 可选，默认自适应
radius: 45                    # 可选，默认40
blur: 0.9                     # 可选，默认0.85
auto_scale: true              # 可选，默认false
scale_margin: 5               # 可选，默认0
update_interval: 10           # 可选，默认30秒
min_value: 0                  # 可选，手动设置最小值
max_value: 100                # 可选，手动设置最大值
opacity: 0.8                  # 可选，热力图透明度
gradient:                     # 可选，默认蓝->绿->红
  0.0: "#00f"
  0.5: "#0f0"
  1.0: "#f00"
show_legend: true             # 可选，默认false
legend_position: bottom       # 可选，默认right
legend_unit: "°C"            # 可选
show_labels: false            # 可选，是否显示标签
error_message: "传感器数据获取失败"  # 可选，自定义错误信息
points:                       # 必需，至少一个点
  - x: 120                    # 必需
    y: 100                    # 必需
    entity_id: sensor.temp_living  # entity_id和value二选一
    label: "Living Room"      # 可选
  - x: 320
    y: 280
    value: 25.5               # 静态值
    label: "Kitchen"
```

---

## ⚙️ 配置字段详细说明

### 🖼️ 基础配置
| 配置项             | 类型     | 必需 | 默认值 | 描述 |
|--------------------|----------|------|-------|------|
| `background`        | string   | ✅   | -     | 背景图路径，支持本地路径或URL |
| `width`             | number   | ❌   | auto  | 卡片宽度（像素） |
| `height`            | number   | ❌   | auto  | 卡片高度（像素） |

### 🔥 热力图配置
| 配置项             | 类型     | 必需 | 默认值 | 验证规则 | 描述 |
|--------------------|----------|------|-------|----------|------|
| `radius`            | number   | ❌   | 40    | 10-100   | 热力点半径（像素） |
| `blur`              | number   | ❌   | 0.85  | 0-1      | 模糊程度 |
| `opacity`           | number   | ❌   | 0.6   | 0-1      | 热力图透明度 |
| `max_value`         | number   | ❌   | -     | > 0      | 手动设置最大值 |
| `min_value`         | number   | ❌   | -     | ≥ 0      | 手动设置最小值 |

### 📊 缩放配置
| 配置项             | 类型     | 必需 | 默认值 | 描述 |
|--------------------|----------|------|-------|------|
| `auto_scale`        | boolean  | ❌   | false | 自动缩放热力图值域 |
| `scale_margin`      | number   | ❌   | 0     | 缩放余量百分比（0-50） |

### 🔄 更新配置
| 配置项             | 类型     | 必需 | 默认值 | 验证规则 | 描述 |
|--------------------|----------|------|-------|----------|------|
| `update_interval`   | number   | ❌   | 30    | 5-3600   | 更新频率（秒） |

### 🎨 样式配置
| 配置项             | 类型     | 必需 | 默认值 | 描述 |
|--------------------|----------|------|-------|------|
| `gradient`          | object   | ❌   | 默认渐变 | 颜色渐变映射 |

### 📈 图例配置
| 配置项             | 类型     | 必需 | 默认值 | 可选值 | 描述 |
|--------------------|----------|------|-------|-------|------|
| `show_legend`       | boolean  | ❌   | false | -     | 是否显示图例 |
| `legend_position`   | string   | ❌   | right | top/bottom/left/right | 图例位置 |
| `legend_unit`       | string   | ❌   | ""    | -     | 图例单位文字 |

### 🔥 热力点配置
```yaml
points:  # 数组，必需至少一个元素
  - x: number          # 必需，0-背景图宽度
    y: number          # 必需，0-背景图高度  
    entity_id: string  # 可选，HA实体ID
    value: number      # 可选，静态值
    label: string      # 可选，悬停标签
    weight: number     # 可选，权重(0.1-2.0)，默认1.0
```

---

## 🛡️ 错误处理和验证

### 配置验证规则
- `background` 必需且不能为空
- `points` 必需且至少包含一个有效点
- 每个点必须有 `entity_id` 或 `value` 其中之一
- 数值字段需要在有效范围内

### 错误状态处理
1. **配置错误**：显示错误信息，阻止渲染
2. **背景图加载失败**：显示占位符和错误提示
3. **传感器离线/无效**：在该点显示灰色或问号
4. **网络错误**：显示重试按钮

### 加载状态
- 背景图加载时显示骨架屏
- 数据获取时显示loading动画
- 首次加载完成后淡入动画

---

## 🔧 技术要求

### 兼容性
- Home Assistant 2021.12+ 
- 现代浏览器（Chrome 88+, Firefox 85+, Safari 14+）
- 移动端响应式支持

### 依赖库
- heatmap.js 2.0+
- lit-element（遵循 HA 标准）

### 性能要求
- 支持最多100个热力点
- 更新频率最高每5秒一次
- 内存使用 < 50MB

---

## 🧪 更新逻辑说明

### 自动更新流程
1. 初始化时订阅所有实体状态变化
2. 每 `update_interval` 秒或实体状态变化时触发更新
3. 批量获取所有实体当前值
4. 应用自动缩放（如启用）
5. 重新渲染热力图

### 手动更新
- 支持通过 HA 服务调用手动刷新
- 卡片配置更改时自动重新初始化

---

## 📊 图例（Legend）

### 显示逻辑
- `show_legend: true` 时显示
- 自动计算当前数值范围
- 显示颜色条和对应数值
- 包含单位信息

### 样式
- 支持4个方向布局
- 自适应容器大小
- 可自定义样式

---

## 🧠 自动缩放算法

```typescript
// 启用auto_scale时
const values = points.map(p => getCurrentValue(p));
const min = Math.min(...values);
const max = Math.max(...values);
const margin = (max - min) * (scale_margin / 100);

const adjustedMin = min - margin;
const adjustedMax = max + margin;

// 归一化
const normalizedValue = (value - adjustedMin) / (adjustedMax - adjustedMin);
```

---

## 🎯 验收标准

### 功能测试
- [ ] 配置解析正确
- [ ] 背景图正常显示
- [ ] 热力图渲染正确
- [ ] 实体数据绑定有效
- [ ] 自动更新工作正常
- [ ] 交互功能完整

### 性能测试  
- [ ] 50个点位时更新延迟 < 100ms
- [ ] 内存使用稳定，无泄漏
- [ ] 响应式布局正常

### 兼容性测试
- [ ] 各浏览器显示一致
- [ ] 移动端操作流畅
- [ ] HA不同版本兼容

---

## 🔮 后续扩展功能（V2）

| 优先级 | 功能                     | 描述 |
|-------|--------------------------|------|
| 高     | 支持点击交互             | 点击热力点显示详细信息 |
| 高     | UI配置器               | 可视化配置界面 |
| 中     | 动画过渡                 | 数值变化时的平滑动画 |
| 中     | 支持传感器通配符         | sensor.room_* 批量匹配 |
| 低     | 支持多个图层             | 温度 + 湿度叠加显示 |
| 低     | 历史数据支持             | 显示历史趋势 |

---

## 📦 交付物

### 开发阶段
- 源代码（TypeScript + Lit Element）
- 单元测试
- 集成测试用例
- 开发文档

### 发布阶段  
- `heatmap-card.js` (编译后)
- `README.md` (安装和使用说明)
- `hacs.json` (HACS集成配置)
- 示例配置文件
- 更新日志

---

## 📜 许可证

MIT License
```

## 🎯 主要改进点总结

1. **增加了详细的字段验证规则和默认值**
2. **补充了错误处理和加载状态说明** 
3. **明确了技术要求和兼容性标准**
4. **增加了性能要求和限制**
5. **补充了验收标准和测试要求**
6. **完善了交付物清单**
7. **优化了配置字段的组织结构**
8. **增加了更多实用的配置选项**

这样的需求文档更加完整和可执行，能够指导开发团队进行具体的实现工作。

