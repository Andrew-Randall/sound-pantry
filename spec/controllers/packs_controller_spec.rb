require "rails_helper"

DatabaseCleaner.clean_with(:truncation)

RSpec.describe Api::V1::PacksController, type: :controller do
  let!(:user) { User.create!(email: "andrewrandall1@gmail.com", password: "password", password_confirmation: "password", username: "username", role: "member") };
  let!(:pack_1) { Pack.create(name: "pack_1", img: "http://boop", description: "This is a pack.", user: user) };
  let!(:pack_2) { Pack.create(name: "pack_2", img: "http://boop2", description: "This is also a pack.", user: user) };

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

      expect(response_json.length).to eq 2
      expect(response_json[0]["name"]).to eq pack_1.name
      expect(response_json[1]["name"]).to eq pack_2.name
      expect(response_json[0]["img"]).to eq pack_1.img
      expect(response_json[1]["img"]).to eq pack_2.img
      expect(response_json[0]["description"]).to eq pack_1.description
      expect(response_json[1]["description"]).to eq pack_2.description
      expect(response_json[0]["user_id"]).to eq user.id
      expect(response_json[1]["user_id"]).to eq user.id
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
      response_json = response_json["pack"]

      expect(response_json["name"]).to eq pack_1.name
      expect(response_json["img"]).to eq pack_1.img
      expect(response_json["description"]).to eq pack_1.description
      expect(response_json["user_id"]).to eq user.id

      expect(response_json["name"]).not_to eql(pack_2.name)
      expect(response_json["img"]).not_to eql(pack_2.img)
      expect(response_json["description"]).not_to eql(pack_2.description)
    end
  end
end
