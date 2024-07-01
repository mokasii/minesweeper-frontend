import { Sounds } from '@/plugins/soundPlugin';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $sounds: Sounds;
  }
}
