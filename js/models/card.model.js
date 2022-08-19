"use strict";

class Card {
  title;
  frontImgUrl;
  backImgUrl;
  id;
  constructor(title, frontImgUrl, backImgUrl, id) {
    this.title = title;
    this.frontImgUrl = frontImgUrl;
    this.backImgUrl = backImgUrl;
    this.id = id;
  }
}
