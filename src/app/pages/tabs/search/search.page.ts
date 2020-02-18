import { Component, OnInit, SecurityContext } from "@angular/core";
import {
  SportService,
  GlobalsService,
} from "@app/core/services";
import { CacheService } from "ionic-cache";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 4,
    speed: 400
  };
  public sports: any;
  private CKeySports = "search/images";
  private CGKey = "search-cache/";
  public baseUrl: string;
  public allText = "Todos";
  public allTagSelect = true;

  constructor(
    private sportService: SportService,
    private cache: CacheService,
    private sanitizer: DomSanitizer,
    public globals: GlobalsService,
  ) {}

  async ngOnInit() {
  }
  ionViewWillEnter() {
      this.getSports();
  }
 
  getSports() {
    const ttl = 60 * 60 * 24 * 7;
    const data = this.cache
      .getItem(this.CKeySports)
      .then(cdata => {
        this.sports = cdata;
      })
      .catch(() => {
        this.sportService.getSports().subscribe(
          (resp: any) => {
            this.sports = resp.data;
            this.cache.saveItem(this.CKeySports, this.sports, this.CGKey, ttl);
          },
          (error: any) => {
            console.log("Error al obtener los deportes");
            setTimeout(() => {
              this.getSports();
            }, 1200);
          }
        );
      }); // End Catch
  }
  public sanitizeImage(image: string) {
    // return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
    return this.sanitizer.sanitize(SecurityContext.STYLE, `url(${image})`);
  }
}
