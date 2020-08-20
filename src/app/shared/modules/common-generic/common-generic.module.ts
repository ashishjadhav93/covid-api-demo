import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CustomConfirmationPopupComponent } from './components/custom-confirmation-popup/custom-confirmation-popup.component';
import { MatAutocompleteModule, MatFormFieldModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { TextComponent } from './components/text/text.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AddNewButtonComponent } from './components/add-new-button/add-new-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    MatCheckboxModule,
    CheckboxModule,
    RadioButtonModule
  ],
  declarations: [
    HeaderComponent,
    NotificationComponent,
    CustomConfirmationPopupComponent,
    AutocompleteComponent,
    TextComponent,
    RadioButtonComponent,
    CheckboxComponent,
    AddNewButtonComponent
  ],
  exports: [
    HeaderComponent,
    NotificationComponent,
    CustomConfirmationPopupComponent,
    AutocompleteComponent,
    TextComponent,
    RadioButtonComponent,
    CheckboxComponent,
    AddNewButtonComponent
  ]
})
export class CommonGenericModule { }
