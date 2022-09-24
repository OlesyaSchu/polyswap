[polybot](../README.md) / [Modules](../modules.md) / LoadData

# Module: LoadData

## Table of contents

### Functions

- [loadPairs](LoadData.md#loadpairs)

## Functions

### loadPairs

▸ **loadPairs**(`pairs`, `path`): `Promise`<`void`\>

Загружает данные пар c некоторым интервалом, 
чтобы запрос не был отменен из-за превышения лимита запросов

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pairs` | `any` | Пары, для которых будут запрашиваться данные |
| `path` | `string` | Путь до файла, в который будут записаны результаты запроса |

#### Returns

`Promise`<`void`\>

#### Defined in

loadData.ts:17
