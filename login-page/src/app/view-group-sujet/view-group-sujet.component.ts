import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-group-sujet',
  templateUrl: './view-group-sujet.component.html',
  styleUrls: ['./view-group-sujet.component.css']
})
export class ViewGroupSujetComponent implements OnInit {

  public sessionStorage = sessionStorage;
  group:String[];


  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const serializedFilters = queryParams.get('filters');
			this.group = JSON.parse(decodeURIComponent(serializedFilters as string));
    });
  }

  public clear() {
    sessionStorage.clear();
  }

  public split(text:String){
    return text.split("<br>");
  }
}
