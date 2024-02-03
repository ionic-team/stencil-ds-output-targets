import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'proxies',
        children: [
          {
            path: 'button',
            loadComponent: () => import('../examples/my-button/my-button.component').then(m => m.MyButtonComponent)
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
