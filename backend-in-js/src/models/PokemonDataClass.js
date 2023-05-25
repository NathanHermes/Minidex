export default class PokemonDataClass {
  nickname;
  name;
  height;
  weight;
  type;
  urlImage;
  experience;

  constructor(nickname, name, height, weight, type, urlImage, experience) {
    this.nickname = nickname;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.type = type;
    this.urlImage = urlImage;
    this.experience = experience;
  }
}
