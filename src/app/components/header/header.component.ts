import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Ajout du RouterModule pour gérer queryParams

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
