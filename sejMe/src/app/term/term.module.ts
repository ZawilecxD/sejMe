import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TermsListComponent } from './components/terms-list/terms-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTerms from './state/terms.reducer';
import { TermsEffects } from './state/terms.effects';

const exportedComponents = [TermsListComponent];

@NgModule({
  declarations: [...exportedComponents],
  exports: [...exportedComponents],
  imports: [
    SharedModule,
    StoreModule.forFeature(fromTerms.TERMS_FEATURE_NAME, fromTerms.reducer),
    EffectsModule.forFeature([TermsEffects]),
  ],
})
export class TermModule {}
