import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailHaircutComponent } from './pages/detail-haircut/detail-haircut.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { AgePipe } from './age.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    DetailHaircutComponent,
    MyProfileComponent,
    AgePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
