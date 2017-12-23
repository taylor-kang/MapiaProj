import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// 컴포넌트 임포트
import { 
  MainComponent
} from './main/main.component';

import { 
  GameBoxComponent
} from './game-box/game-box.component';

// 라우트 구성
const routes: Routes = [
	{path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'game', component: GameBoxComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)], /* 모든 라우트 구성을 포함한 모듈을 생성하고 라우팅 모듈에 추가 */
  exports: [RouterModule]

})
export class AppRoutingModule { }

