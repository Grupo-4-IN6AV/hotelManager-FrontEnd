import { Component } from '@angular/core';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';


interface SideNavToggle 
{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-set-components-admin',
  templateUrl: './set-components-admin.component.html',
  styleUrls: ['./set-components-admin.component.css']
})

export class SetComponentsAdminComponent
{

  constructor(private _CargarScripts: CargarScriptsService)
  {
    _CargarScripts.Carga(["scrollBar"]);
  }

  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void 
  {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
