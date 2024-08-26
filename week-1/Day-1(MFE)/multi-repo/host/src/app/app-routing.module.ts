import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mfe1',
    loadChildren: () =>
      loadRemoteModule('mfe1', './UserModule').then((mod) => mod.UserModule),
  },
  {
    path: 'mfe2',
    loadChildren: () =>
      loadRemoteModule('mfe2', './ProductModule').then(
        (mod) => mod.ProductModule
      ),
  },
  {
    path: 'mfe3',
    loadChildren: () =>
      loadRemoteModule('mfe3', './ProductModule').then(
        (mod) => mod.ProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
