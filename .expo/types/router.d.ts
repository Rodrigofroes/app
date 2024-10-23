/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/cliente` | `/(tabs)/historico` | `/(tabs)/servico` | `/_sitemap` | `/cliente` | `/components/avatar.component` | `/components/button.component` | `/components/button.icon.component` | `/components/button.primary.component` | `/components/chart.pie.component` | `/components/floating.button.component` | `/components/input.component` | `/components/modal.client.component` | `/components/picker.component` | `/components/toast.component` | `/constants/colors.constant` | `/historico` | `/http/api.http` | `/login` | `/service/gateway/login.gateway` | `/service/login.service` | `/servico` | `/temp/token.temp` | `/utils/format.currency` | `/utils/typeBoard`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
