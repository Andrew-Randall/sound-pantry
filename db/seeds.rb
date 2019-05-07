packs=[
  ["Kicks", 1, "A collection of kick drums synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-development.s3.amazonaws.com/kicks.png"],
  ["Snares", 1, "A collection of snare drums synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-development.s3.amazonaws.com/snares.png"],
  ["Hi-Hats", 1, "A collection of hi hats synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-development.s3.amazonaws.com/hihats.png"],
  ["Melodies", 1, "A collection of melodies synthesized with Serum and the Moog Sub Phatty. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-development.s3.amazonaws.com/melodies.png"],
  ["Ambience", 1, "A collection of ambience recorded with a Zoom h2. Great for adding natural ambience to all your productions!", "https://sound-pantry-development.s3.amazonaws.com/ambience.png"],
  ["Bass", 1, "A collection of bass one-shots synthesized with Serum and processed in Ableton. Great for Dubstep, Hard Bass, Bass House and much more!", "https://sound-pantry-development.s3.amazonaws.com/bass.png"]
]

samples=[
  ["Kick1", 1, 1, "https://sound-pantry-development.s3.amazonaws.com/kick1.mp3"],
  ["Kick2", 1, 1, "https://sound-pantry-development.s3.amazonaws.com/kick2.mp3"],
  ["Kick3", 1, 1, "https://sound-pantry-development.s3.amazonaws.com/kick3.mp3"],
  ["Kick4", 1, 1, "https://sound-pantry-development.s3.amazonaws.com/kick4.mp3"],
  ["Kick5", 1, 1, "https://sound-pantry-development.s3.amazonaws.com/kick5.mp3"]
]

packs.each do |pack|
  name, user_id, description, img = pack
  Pack.create!(name: name, user_id: user_id, description: description, img: img)
end

samples.each do |sample|
  name, user_id, pack_id, path = sample
  Sample.create!(name: name, user_id: user_id, pack_id: pack_id, path: path)
end
