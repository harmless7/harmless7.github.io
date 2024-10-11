---
title: "了解一下 JsonSchema"
description: "复习一下 json schema 的基本语法"
heroImage: "https://s2.loli.net/2023/06/25/NJc5pHvAIQKxR8b.jpg"
publishDate: "2023-06-25"
---

## 参考

[自己翻译的 json 入门手册](https://gitee.com/mostly_harmless/learn-json-schema)

[官方文档](https://json-schema.org/)

[稀土掘金——JSON Schema入门和应用](https://juejin.cn/post/7071174879778242568#heading-8)

## What's this?

![json schema](https://s2.loli.net/2023/06/25/NJc5pHvAIQKxR8b.jpg)

约束 json 格式的信息（该信息本身也用 json 写成）。

## 基础

| 属性名      | 作用                                                                                                                            | 例                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| $schema     | 声明该模式是根据标准的特定草案编写的，主要用于版本控制。                                                                        | `"$schema": "https://json-schema.org/draft/2020-12/schema"` |
| $id         | 声明一个统一资源标识符，不同模式之间可通过该值相互引用                                                                          | `"$id": "http://example.com/example.json"`                  |
| title       | 模式名                                                                                                                          | `"title": "学生"`                                           |
| description | 注释                                                                                                                            | `"description": "学生信息的规范"`                           |
| type        | 数据类型，使用字符串或字符串数组定义。<br/>可使用的类型为 `null`, `boolean`, `object`, `array`, `number`, `string` 或 `integer` | `"type": "object"`                                          |

## 属性

通过 `properties` 可以定义 json 数据的具体属性。

```json
{
	"properties": {
		"name": {
			"type": "string"
		}
	}
}
```

如上例即定义了 json 数据中，`name` 属性必须为 `string` 类型。

具体有哪些规范请参考 [官方文档](https://json-schema.org/understanding-json-schema/index.html)。

以下分类型列举一些常用的约束属性，以便查阅：

### 通用

| 属性名      | 作用                                            | 例                                     |
| ----------- | ----------------------------------------------- | -------------------------------------- |
| description | 属性注释                                        | `"description": "学生的班级号码"`      |
| type        | 属性类型，具体同上[基础](#基础)中的 `type` 类型 | `"type": "string"`                     |
| pattern     | 正则匹配                                        | `"pattern": "^1\\d{10}$"`              |
| enum        | 枚举，属性值必须为枚举数组中的某一个            | `"enum": ["red", "#336699", null, 42]` |
| const       | 指定值，即属性值必须等于该值                    | `"country": "Roman Empire"`            |

### string

应该是最常用的类型。

| 属性名    | 作用                                            | 例                        |
| --------- | ----------------------------------------------- | ------------------------- |
| minLength | 字符串最小长度                                  | `"minLength": 3`          |
| maxLength | 字符串最大长度                                  | `"maxLength": 20`         |
| pattern   | 正则匹配                                        | `"pattern": "^1\\d{10}$"` |
| format    | 一些预设好的字符串格式，如 `date`, `email` 等。 | `"format": "date-time"`   |

::: info `format` 使用注意
`format` 默认情况只是一个 _注释_，而不会去 _验证_ 字符串。除非验证器支持使用 `format` 验证。

具体支持请参考 [官方文档](https://json-schema.org/understanding-json-schema/reference/string.html#built-in-formats)。
:::

### number & integer

| 属性名           | 作用             | 例                       |
| ---------------- | ---------------- | ------------------------ |
| multipleOf       | 指定正整数的倍数 | `"multipleOf": 10`       |
| minimum          | 小于等于指定值   | `"minimum": 20`          |
| exclusiveMinimum | 小于指定值       | `"exclusiveMinimum": 20` |
| maximum          | 大于等于指定值   | `"maximum": 20`          |
| exclusiveMaximum | 大于指定值       | `"exclusiveMaximum": 20` |

### array

| 属性名      | 作用                                                                     | 例                                                              |
| ----------- | ------------------------------------------------------------------------ | --------------------------------------------------------------- |
| items       | 数组项统一约束（使用对象定义，所有数组项统一格式）                       | `"items": { "type": "number" }`                                 |
| prefixItems | 数组项分别约束（使用数组定义，定义的数组下标，对应需约束数组数据的下标） | `"prefixItems": [ { "type": "number" }, { "type": "string" } ]` |
| minItems    | 数组最小长度                                                             | `"minItems": 1`                                                 |
| maxItems    | 数组最大长度                                                             | `"maxItems": 3`                                                 |
| uniqueItems | 数组项是否唯一                                                           | `"uniqueItems": true`                                           |

::: tip 如果同时设定 `items` 和 `prefixItems`
当两者同时设定，分两种情况：

1. `items` 的值为对象：
   数组的前几项按照 `prefixItems` 的规范校验，超出部分再按 `items` 规则校验;
2. `items` 的值为 false：
   数组不得超出 `prefixItems` 规定的部分。
   :::

### object

| 属性名               | 作用                                                                                     | 例                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| properties           | 约束*指定名称*的属性（没错，这意味着可以无限套娃）                                       | `"properties": { "name": { "type": "string"} }`                                      |
| patternProperties    | 正则匹配属性名                                                                           | `"patternProperties": { "^S_": { "type": "string" }, "^I_": { "type": "integer" } }` |
| additionalProperties | 是否允许出现未匹配的属性，使用布尔值约束。<hr />或者使用一个对象，来约束所有未匹配属性。 | `"additionalProperties": false`<hr />`"additionalProperties": { type: "string" }`    |
| required             | 必填属性                                                                                 | `"required": [ "name", "age" ]`                                                      |
| uniqueItems          | 属性是否必填                                                                             | `"uniqueItems": true`                                                                |
| minProperties        | 对象最小长度                                                                             | `"minProperties": 3`                                                                 |
| maxProperties        | 对象最大长度                                                                             | `"maxProperties": 5`                                                                 |
| propertyNames        | 属性名校验（只校验属性名，不约束属性值）                                                 | `"propertyNames": { "pattern": "^[A-Za-z_][A-Za-z0-9_]*$" }`                         |

::: tip
以上所有属性，均可使用在 `json schema` 的最外层。

往往 schema 的约束都是 `type:object`。
:::

## 组合约束

当需要对约束进行 与或非 逻辑操作时使用，可参考布尔代数概念来理解：

### `allOf`

(AND) 同时满足多个条件

```json
{
	"allOf": [{ "type": "string" }, { "maxLength": 5 }]
}
```

> "short" ✅
>
> "too long" ❌

### `anyOf`

(OR) 满足多个条件中至少一个

```json
{
	"anyOf": [
		{ "type": "string", "maxLength": 5 },
		{ "type": "number", "minimum": 0 }
	]
}
```

> "short" ✅
>
> "too long" ❌
>
> 12 ✅
>
> -5 ❌

### `oneOf`

(XOR) 只满足多个条件中的一个

```json
{
	"oneOf": [
		{ "type": "number", "multipleOf": 5 },
		{ "type": "number", "multipleOf": 3 }
	]
}
```

> 10 ✅
>
> 9 ✅
>
> 15 ❌

### `not`

(NOT) 不满足特定条件

```json
{ "not": { "type": "string" } }
```

> 42 ✅
>
> { "key": "value" } ✅
>
> "I am a string" ❌

## 条件约束

### 存在依赖

当 a 属性存在时，b 属性必填。可以使用 `dependentRequired`。

```json
{
	"dependentRequired": {
		"a": ["b"]
	}
}
```

### 描述依赖

当 a 属性存在时，对约束整体有所调整（例如新增了对 c 属性的约束）。可以使用 `dependentSchemas`。

```json
{
	"dependentSchemas": {
		"a": {
			"properties": {
				"c": { "type": "string" }
			},
			"required": ["c"]
		}
	}
}
```

### IF-THEN-ELSE

满足 `if` 中条件，走 `then`，否则走 `else`。

```json
{
	"type": "object",
	"properties": {
		"street_address": {
			"type": "string"
		},
		"country": {
			"default": "United States of America",
			"enum": ["United States of America", "Canada"]
		}
	},
	"if": {
		"properties": { "country": { "const": "United States of America" } }
	},
	"then": {
		"properties": { "postal_code": { "pattern": "[0-9]{5}(-[0-9]{4})?" } }
	},
	"else": {
		"properties": {
			"postal_code": { "pattern": "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]" }
		}
	}
}
```

## 复用

### `$ref`

用于引用其它模式的定义，需要填入其它模式的 `$id`。

例如：

```json
{
	"$id": "https://example.com/schemas/customer",
	"type": "object",
	"properties": {
		"shipping_address": { "$ref": "/schemas/address" },
		"billing_address": { "$ref": "/schemas/address" }
	}
}
```

::: warning
这个跨模式引用我尚未成功实现。

要用的时候回来啃啃 [文档](https://json-schema.org/understanding-json-schema/structuring.html)。
:::

### `$defs`

局部子模式。用于定义在一个模式内复用的约束。

```json
{
	"properties": {
		"first_name": { "$ref": "#/$defs/name" },
		"last_name": { "$ref": "#/$defs/name" }
	},

	"$defs": {
		"name": { "type": "string" }
	}
}
```

### 递归

模式可以自己引用自己，例如树状列表结构，子节点的结构和父亲节点一样：

```json
{
	"type": "object",
	"properties": {
		"name": { "type": "string" },
		"children": {
			"type": "array",
			"items": { "$ref": "#" }
		}
	}
}
```

## 工具🔧

1. [JSON 生成 JSON Schema](https://www.jsonschema.net/)
2. [使用 JSON Schema 生成 mock 数据](https://json-schema-faker.js.org/)
3. [JSON Schema 校验工具 —— Ajv](https://github.com/ajv-validator/ajv)
4. [vue JSON Schema 生成表单](https://github.com/lljj-x/vue-json-schema-form)
