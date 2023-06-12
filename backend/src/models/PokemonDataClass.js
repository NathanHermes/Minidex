export default class PokemonDataClass {
  pokemon_id;
  name;
  nickname;
  height;
  weight;
  type;
  urlImage;
  experience;
  id_trainer;

  constructor(
    pokemon_id,
    nickname,
    name,
    height,
    weight,
    type,
    urlImage,
    experience,
    id_trainer
  ) {
    this.pokemon_id = pokemon_id;
    this.name = name;
    this.nickname = nickname;
    this.height = height;
    this.weight = weight;
    this.type = type;
    this.urlImage = urlImage;
    this.experience = experience;
    this.id_trainer = id_trainer;
  }
}
