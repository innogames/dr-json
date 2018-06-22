import {ComponentClass} from 'react';
import {ArrayOnelineRenderer} from './ArrayOnelineRenderer';
import {ArrayRenderer} from './ArrayRenderer';
import {ArrayRowsRenderer} from './ArrayRowsRenderer';
import {BoolRenderer} from './BoolRenderer';
import {FallbackRenderer} from './FallbackRenderer';
import {JsonRenderProps} from './JsonRenderProps';
import {ListRenderer} from './ListRenderer';
import {NullRenderer} from './NullRenderer';
import {NumberRenderer} from './NumberRenderer';
import {ObjectRenderer} from './ObjectRenderer';
import {StringRenderer} from './StringRenderer';

export let rendererMap: Map<string, ComponentClass<JsonRenderProps>> = new Map();

rendererMap.set('fallback', FallbackRenderer);
rendererMap.set('array', ArrayRenderer);
rendererMap.set('arrayOneline', ArrayOnelineRenderer);
rendererMap.set('arrayRows', ArrayRowsRenderer);
rendererMap.set('bool', BoolRenderer);
rendererMap.set('number', NumberRenderer);
rendererMap.set('object', ObjectRenderer);
rendererMap.set('string', StringRenderer);
rendererMap.set('null', NullRenderer);
rendererMap.set('list', ListRenderer);

export function getDefaultRenderer(value: any, schemaType: string, valueType: string): string {
    if (schemaType == 'object' && valueType == 'object') {
        return 'object';
    }

    if (schemaType == 'array' && Array.isArray(value)) {
        return 'array';
    }

    if (schemaType == 'boolean' && valueType === 'boolean') {
        return 'bool';
    }

    if ((schemaType == 'integer' || schemaType == 'number') && valueType === 'number') {
        return 'number';
    }

    if (schemaType == 'string' && valueType == 'string') {
        return 'string';
    }

    if (schemaType == 'null' && value == null) {
        return 'null';
    }

    // fallback when value does not mach schema or there is no schema
    return 'fallback';
}