import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import {Router} from '@angular/router';
// import { Hero } from './hero';
@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  // heroes = HEROES;
  selectedHero: Hero;
  
  heroes: Hero[];
  
  getHeroes():void{
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit():void{
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });
  }


}


export class Hero {
  id: number;
  name: string;
}

