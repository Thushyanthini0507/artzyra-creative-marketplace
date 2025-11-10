import Artist from "../models/artist.js";

class ArtistService {
  async getAllArtists() {
    return await Artist.find();
  }

  async getArtistById(id) {
    const artist = await Artist.findById(id);
    if (!artist) {
      throw new Error("Artist not found");
    }
    return artist;
  }

  async createArtist(data) {
    const artist = new Artist(data);
    return await artist.save();
  }

  async updateArtist(id, data) {
    const artist = await Artist.findById(id);
    if (!artist) {
      throw new Error("Artist not found");
    }
    return await Artist.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteArtist(id) {
    const artist = await Artist.findByIdAndDelete(id);
    if (!artist) {
      throw new Error("Artist not found");
    }
    return artist;
  }
}

export default new ArtistService();



