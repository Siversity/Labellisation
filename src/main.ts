import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { PageEditionModule } from './page-edition/page-edition.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PageEditionModule)
  .catch(err => console.error(err));
