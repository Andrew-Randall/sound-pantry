packs=[
  ["Kicks", 1, "A collection of kick drums synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry.s3.amazonaws.com/kicks.png"],
  ["Snares", 1, "A collection of snare drums synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry.s3.amazonaws.com/snares.png"],
  ["Hi-Hats", 1, "A collection of hi hats synthesized with Serum, layered with natural sounds and processed in Ableton. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry.s3.amazonaws.com/hihats.png"],
  ["Melodies", 1, "A collection of melodies synthesized with Serum and the Moog Sub Phatty. Great for Hip-Hop, Trap, Dubstep and Future Bass!", "https://sound-pantry.s3.amazonaws.com/melodies.png"],
  ["Ambience", 1, "A collection of ambience recorded with a Zoom h2. Great for adding natural ambience to all your productions!", "https://sound-pantry.s3.amazonaws.com/ambience.png"],
  ["Bass", 1, "A collection of bass one-shots synthesized with Serum and processed in Ableton. Great for Dubstep, Hard Bass, Bass House and much more!", "https://sound-pantry.s3.amazonaws.com/bass.png"]
]

packs.each do |pack|
  name, user_id, description, img = pack
  Pack.create!(name: name, user_id: user_id, description: description, img: img)
end
