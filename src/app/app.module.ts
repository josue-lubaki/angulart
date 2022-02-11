import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FooterModule} from "./pages/footer/footer.module";
import {NavigationModule} from "./pages/navigation/navigation.module";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NavigationModule, FooterModule, ToastModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
