require "rails_helper"

DatabaseCleaner.clean_with(:truncation)

RSpec.describe Api::V1::CollectionsController, type: :controller do
  let!(:user) { User.create(email: "test@gmail.com", password: "password", password_confirmation: "password", username: "username", role: "member") };
  let!(:pack_1) { Collection.create(name: "pack_1", img: "http://boop.com", description: "This is a pack.", user: user) };
  let!(:pack_2) { Collection.create(name: "pack_2", img: "http://boop2.com", description: "This is also a pack.", user: user) };

  describe "GET#index" do
    it "returns successful response with json-formatted data" do
      get :index
      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns all packs in the database" do
      get :index

      response_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"

      expect(response_json["collections"].length).to eq 2
      expect(response_json["collections"][0]["name"]).to eq pack_1.name
      expect(response_json["collections"][1]["name"]).to eq pack_2.name
      expect(response_json["collections"][0]["img"]).to eq pack_1.img
      expect(response_json["collections"][1]["img"]).to eq pack_2.img
      expect(response_json["collections"][0]["description"]).to eq pack_1.description
      expect(response_json["collections"][1]["description"]).to eq pack_2.description
      expect(response_json["collections"][0]["user_id"]).to eq user.id
      expect(response_json["collections"][1]["user_id"]).to eq user.id
    end
  end

  describe "GET#show" do
    let!(:user) { User.create!(email: "andrewrandall1@gmail.com", password: "password", password_confirmation: "password", username: "username", role: "member") };
    it "returns successful response with json-formatted data" do
      sign_in user
      get :show, params: {id: pack_1.id}

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "returns the correct pack data in a usable format" do
      sign_in user
      get :show, params: {id: pack_1.id}
      response_json = JSON.parse(response.body)
      response_json = response_json["collection"]

      expect(response_json["name"]).to eq pack_1.name
      expect(response_json["img"]).to eq pack_1.img
      expect(response_json["description"]).to eq pack_1.description
      expect(response_json["user_id"]).to eq user.id

      expect(response_json["name"]).not_to eql(pack_2.name)
      expect(response_json["img"]).not_to eql(pack_2.img)
      expect(response_json["description"]).not_to eql(pack_2.description)
    end
  end

  describe "POST#create" do
    let!(:user) { User.create!(email: "andrewrandall1@gmail.com", password: "password", password_confirmation: "password", username: "username", role: "member") };
    it "creates a collection" do
      sign_in user
      post_json = {
        name: "Test Collection",
        img: "www.picture.com",
        description: "A bunch of sounds",
        user_id: user.id
      }.to_json

      prev_count = Collection.count
      post(:create, body: post_json)
      expect(Collection.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted collection" do
      sign_in user
      post_json = {
        name: "Test Collection",
        img: "www.picture.com",
        description: "A bunch of sounds",
        user_id: user.id
      }.to_json

      post(:create, body: post_json)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq ("application/json")

      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["collection"]["name"]).to eq "Test Collection"
      expect(returned_json["collection"]["img"]).to eq "www.picture.com"
      expect(returned_json["collection"]["description"]).to eq "A bunch of sounds"
      expect(returned_json["collection"]["user_id"]).to eq user.id
    end
  end
end
