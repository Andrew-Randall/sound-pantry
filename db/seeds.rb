collections=[
  ["Kicks", 1, "A collection of kick drums synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-dev.s3.amazonaws.com/kicks.png"],
  ["Snares", 1, "A collection of snare drums synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-dev.s3.amazonaws.com/snares.png"],
  ["Hi-Hats", 1, "A collection of hi hats synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-dev.s3.amazonaws.com/hihats.png"],
  ["Melodies", 1, "A collection of melodies synthesized with Serum and the Moog Sub Phatty. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry-dev.s3.amazonaws.com/melodies.png"],
  ["Percussion", 1, "A collection of percussion sounds synthesized with Serum, layered with natural sounds and processed in Ableton. Great for all genres!", "https://sound-pantry-dev.s3.amazonaws.com/Percussion.png"],
  ["Bass", 1, "A collection of bass one-shots synthesized with Serum and processed in Ableton. Great for Dubstep, Hard Bass, Bass House and much more!", "https://sound-pantry-dev.s3.amazonaws.com/bass.png"]
]

samples=[
  ["Kick1", 1, 1, "https://sound-pantry-dev.s3.amazonaws.com/kick1.mp3"]
]

collections.each do |collection|
  name, user_id, description, img = collection
  Collection.create!(name: name, user_id: user_id, description: description, img: img)
end

samples.each do |sample|
  name, user_id, collection_id, path = sample
  Sample.create!(name: name, user_id: user_id, collection_id: collection_id, path: path)
end
