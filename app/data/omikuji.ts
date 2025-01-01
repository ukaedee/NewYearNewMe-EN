export interface Result {
  text: string;
  textLines: string[];
  description: string;
  descriptionLines: string[];
  video: `result-${1 | 2 | 3 | 4 | 5 | 6 | 7}.mp4`;
}

export const results: Result[] = [
  {
    text: "You gonna keep your eyes off the phone on the next train ride",
    description: "You gonna keep your eyes off the phone on the next train ride",
    video: "result-1.mp4" as const,
    textLines: ["You gonna keep your eyes off the phone on the next train ride"],
    descriptionLines: [
      "Try gazing out the window or just watching the world go by –",
      "You might feel more refreshed than you expect!",
      "Let your mind wander until you reach your stop",
    ]
  },
  {
    text: "Get off one station early and find your way home without using a map app",
    description: "Get off one station early and find your way home without using a map app",
    video: "result-2.mp4" as const,
    textLines: ["Get off one station early and find your way home without using a map app"],
    descriptionLines: [
      "Forget the usual route,",
      "Take a random detour – you might stumble upon something cool!",
      "Sometimes, getting lost on the way home can lead to a pleasant surprise!"
    ]
  },

  {
    text: "Take off your earphones today and tune into the sounds around you",
    description: "Take off your earphones today and tune into the sounds around you",
    video: "result-3.mp4" as const,
    textLines: ["Take off your earphones today and tune into the sounds around you"],
    descriptionLines: [
      "Birds chirping, traffic – just the sounds of life.",
      "Think about what you’re hearing, and let your mind wander.",
      "Sometimes, zoning out to the world of soundtrack is the best way to refresh your mind !"
    ]
  },
 
  {
    text: "Take a moment to look down and notice what your've been overlooking",
    description: "Take a moment to look down and notice what your've been overlooking",
    video: "result-4.mp4" as const,
    textLines: ["Take a moment to look down and notice what your've been overlooking"],
    descriptionLines: [
      "Notice the patterns on the ground, leaves, pebbles –",
      "Walk a bit slower and really take it in.",
      "You’d be surprised how many cool little things you’ve been missing !"
    ]
  },
  {
    text: "Look up and discover the small patterns around you.",
    description: "Look up and discover the small patterns around you.",
    video: "result-5.mp4" as const,
    textLines: ["Look up and discover the small patterns around you."],
    descriptionLines: [
      "Notice the patterns on ceilings, walls, signs, and rooftops.",
      "Pay attention to the materials, colors, and designs.",
      "You’d be surprised how fun it is to observe them as you walk!",
    ]
  },
  {
    text: "Let's wake up early and go for a nice brunch tomorrow morning",
    description: "Let's wake up early and go for a nice brunch tomorrow morning  ",
    video: "result-6.mp4" as const,
    textLines: ["Let's wake up early and go for a nice brunch tomorrow morning  "],
    descriptionLines: [
      "Deciding to have a great breakfast tomorrow makes it something to look forward to!",
      "Put down the scroll, and let’s rest up for tomorrow!"
    ]
  },
  {
    text: "Let's eat the next meal without looking at our phones",
    description: "Let's eat the next meal without looking at our phones",
    video: "result-7.mp4" as const,
    textLines: ["Let's eat the next meal without looking at our phones"],
    descriptionLines: [
      "Take a moment to really savor the colors and flavors,",
      "It might be a good way to slow down and focus on the present.",

    ]
  },
 
]; 