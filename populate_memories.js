const API_URL = "http://localhost:80/api/memories";
const INTERVAL_MS = 3000;

const memories = [
  // Row 1
  {
    name: "SELF-WORTH",
    fearState: {
      tag: "FEAR",
      videoUrl: "https://media.istockphoto.com/id/2252912931/video/playful-asian-woman-making-a-goofy-and-teasing-face-at-the-camera.mp4?s=mp4-640x640-is&k=20&c=NaTMYEJQl6fwcItq-uOgcfQ6UY5Wxq11AWt2924Ui_E=",
    },
    courageState: {
      tag: "COURAGE",
      videoUrl: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZmVzMzJxbGx0eWRsZGV5aGswcHE0N3dwazdjaWkwZXBybHV2czhlZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kw0XK5ROoezOUMEnjF/giphy.gif",
    },
  },
  {
    name: "CONNECTION",
    fearState: {
      tag: "ISOLATION",
      videoUrl: "https://media.istockphoto.com/id/2258922209/video/upset-little-girl-standing-alone-at-school-playground.mp4?s=mp4-640x640-is&k=20&c=nb3E3l5fI1Y1sOGrpfNEaLlSkWDc9ADDeYzrMAeqqdI=",
    },
    courageState: {
      tag: "BELONGING",
      videoUrl: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Ymw4eng0MGdrbjh6ZWJma2U0OGVxa3AwY3Fwdmw3cnR1NTNwa3h1eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vy9FyphoNX6SSOZRlr/giphy.gif",
    },
  },
  {
    name: "GROWTH",
    fearState: {
      tag: "STAGNATION",
      videoUrl: "https://media.istockphoto.com/id/2198816349/video/weightloss-concept-overweight-transgender-touches-belly-in-front-of-mirror.mp4?s=mp4-640x640-is&k=20&c=asM1aauGBTINPsHKN1ABdsj0-egbJszBsG_n1T_FT3g=",
    },
    courageState: {
      tag: "EXPANSION",
      videoUrl: "https://media.istockphoto.com/id/1053110944/video/female-diver-diving-into-the-blue-pool-and-rotating-in-the-air.mp4?s=mp4-640x640-is&k=20&c=QVnDHd-48cJuZ15ZAtKtns4_PQY6h5uCKds4vUWiAgY=",
    },
  },
  {
    name: "CONVERSATIONS",
    fearState: {
      tag: "RESERVED",
      videoUrl: "https://media.istockphoto.com/id/1353885351/video/man-looking-away-contemplating-at-home.mp4?s=mp4-640x640-is&k=20&c=1x9VoDnmnp2OUJ_qdC0fWbN77sSkppgZpw3YDANVpQE=",
    },
    courageState: {
      tag: "OPEN",
      videoUrl: "https://media.istockphoto.com/id/629177256/video/mature-female-friends-socializing-in-backyard-together.mp4?s=mp4-640x640-is&k=20&c=Vvt6HZnwBoakqu9wiPMkcuAEZFbTE7cAXlJeTdkYHQs=",
    },
  },
  // Row 2
  {
    name: "CHOICE",
    fearState: {
      tag: "PARALYSIS",
      videoUrl: "https://media.istockphoto.com/id/2105470058/video/stress-anxiety-and-woman-biting-nails-in-home-with-fear-worry-and-mental-health-risk-face-of.mp4?s=mp4-640x640-is&k=20&c=iCH_PgQinuGGOzBIA-AY0jljwKOJjnoqDqyk_gzJJQw=",
    },
    courageState: {
      tag: "DECISIVENESS",
      videoUrl: "https://media.istockphoto.com/id/1486865540/video/black-maze.mp4?s=mp4-640x640-is&k=20&c=8qU_LDjOcgv6UCNXCGP7_DZKwjbSSr6CuEpsK3f7F00=",
    },
  },
  {
    name: "DESIRE",
    fearState: {
      tag: "EMPTINESS",
      videoUrl: "https://media.istockphoto.com/id/2102638948/video/a-woman-stands-against-the-wall.mp4?s=mp4-640x640-is&k=20&c=ABu8SMit40tddbl2QPgoUrS1erp746bjLXZYRZt55R8=",
    },
    courageState: {
      tag: "FULFILLMENT",
      videoUrl: "https://media.istockphoto.com/id/823353126/video/reaching-the-highest-peak-of-pleasure.mp4?s=mp4-640x640-is&k=20&c=CQyxUb4DkNV9RNAj5hS4IXD07f05JBRUY6uRExrJfZI=",
    },
  },
  {
    name: "PATIENCE",
    fearState: {
      tag: "RESTLESSNESS",
      videoUrl: "https://media.istockphoto.com/id/1404441349/video/woman-in-bed-cant-sleep-due-to-insomnia.mp4?s=mp4-640x640-is&k=20&c=NaLbJ4lYGhC4pLSJZrtJ_CpFI9tlRD57N4xr0APGIIE=",
    },
    courageState: {
      tag: "CALM",
      videoUrl: "https://media.istockphoto.com/id/2171649171/video/woman-practice-yoga-on-the-beach.mp4?s=mp4-640x640-is&k=20&c=IeXtnFN7nnx40su81dtTi4loVA6CP0WA7tPDwBPWW6k=",
    },
  },
  {
    name: "NAVIGATION",
    fearState: {
      tag: "PASSENGER",
      videoUrl: "https://media.istockphoto.com/id/2192712108/video/waiting-for-time-to-pass.mp4?s=mp4-640x640-is&k=20&c=6YlblIDmC0GbDxjRgx52OkEtf7Dg0KxrRH35BeTEEG0=",
    },
    courageState: {
      tag: "NAVIGATOR",
      videoUrl: "https://media.istockphoto.com/id/1868043256/video/female-runner-with-headlamp-and-phone-jogging-out-of-dark-tunnel.mp4?s=mp4-640x640-is&k=20&c=73Dpi2wx6XTTSRDYw1q0pBjhYpylnCdzguKbQgQOr_Q=",
    },
  },
  // Row 3
  {
    name: "ACCEPTANCE",
    fearState: {
      tag: "RESISTANCE",
      videoUrl: "https://media.istockphoto.com/id/2194401176/video/close-up-of-elderly.mp4?s=mp4-640x640-is&k=20&c=J4_T1MOD4FX2BULnSSbjqfyWf-QRbRF_4nGsiEUZits=",
    },
    courageState: {
      tag: "SURRENDER",
      videoUrl: "https://media.istockphoto.com/id/1828085832/video/a-hand-caresses-the-surface-of-the-sea-water-from-a-boat-at-sunset.mp4?s=mp4-640x640-is&k=20&c=jf9a6nbiHFEX0Ro0hlrjwULmwNoZ-NsfGb-E9OlR_no=",
    },
  },
  {
    name: "AMBITION",
    fearState: {
      tag: "COMPLACENCY",
      videoUrl: "https://media.istockphoto.com/id/2063034193/video/slow-motion-close-up-of-ocean-ripples-and-waves.mp4?s=mp4-640x640-is&k=20&c=aU_Is--jTM_n-gGItatPDzsmV9dj0menC3zd6IVCB64=",
    },
    courageState: {
      tag: "DRIVE",
      videoUrl: "https://media.istockphoto.com/id/1300424928/video/4k-animation-loop-futuristic-sci-fi-lines-white-neon-tube-lights-glowing-in-concrete-floor.mp4?s=mp4-640x640-is&k=20&c=FuSMVRKTqrI4MOyHNaraZx5Ya_0WrspjT7giPNVz_9o=",
    },
  },
  {
    name: "DREAMS",
    fearState: {
      tag: "LIMITATION",
      videoUrl: "https://media.istockphoto.com/id/2121377254/video/ld-grains-of-sand-in-the-hourglass-falling-onto-the-small-pile.mp4?s=mp4-640x640-is&k=20&c=gg7fI3hEJjyGUWrwRFYW9cMXRH2wpHNUmWzhKDhsRa4=",
    },
    courageState: {
      tag: "POSSIBILITY",
      videoUrl: "https://media.istockphoto.com/id/635677590/video/cinematic-sunrise-from-space-with-city-lights-4k.mp4?s=mp4-640x640-is&k=20&c=Ji4NIJ2nh6g-3B3kZXRcJTzOxDLdGAaisfaR_85PggU=",
    },
  },
  {
    name: "DEPTH",
    fearState: {
      tag: "SHALLOW",
      videoUrl: "https://media.istockphoto.com/id/2149097364/video/inflatable-dinosaur-beach-and-happy-with-jump-for-entertainment-as-performer-or-playful-with.mp4?s=mp4-640x640-is&k=20&c=TsWGC2jgUumFig6wKpeGVtU9mgFLu4JYq7ChMNGiTec=",
    },
    courageState: {
      tag: "DEEP",
      videoUrl: "https://media.istockphoto.com/id/1387007224/video/sun-rays-sun-beams-and-sun-shine-underwater-in-cave-beautiful-light-scenery-in-ocean-scuba.mp4?s=mp4-640x640-is&k=20&c=HODauv89J1LQS5I1_pfxsR7uWJSyl33tfjUEUFpenyc=",
    },
  },
  // Row 4
  {
    name: "TRUTH",
    fearState: {
      tag: "ASSUMPTIONS",
      videoUrl: "https://media.istockphoto.com/id/2229425439/video/serious-caucasian-business-woman-businesswoman-girl-looking-at-camera-showing-stop-gesture.mp4?s=mp4-640x640-is&k=20&c=vDvXWws4y-lVj9aVcwZh8irLr-QXFt3sM9JHmIPhgnU=",
    },
    courageState: {
      tag: "CURIOSITY",
      videoUrl: "https://media.istockphoto.com/id/1872123406/video/woman-hands-on-the-background-of-developing-ribbons-from-the-wind-arm-gestures-of-victory-or.mp4?s=mp4-640x640-is&k=20&c=3sZ5LWNTAzgd2nb9riC_ZnShcjuH7qUC9uKP-jjVMz0=",
    },
  },
  {
    name: "AUTHENTICALLY YOU",
    fearState: {
      tag: "YOU NEED OTHERS TO SUCCED",
      videoUrl: "https://media.istockphoto.com/id/1151993040/video/theres-no-such-thing-as-a-silly-question.mp4?s=mp4-640x640-is&k=20&c=XxaaXUGY0YCeMBZgOTh_rwK9oyrOh-McLl7LxgHzZH4=",
    },
    courageState: {
      tag: "YOU ARE MORE THAN ENOUGH, YOU ARE YOURE OWN PERSOn",
      videoUrl: "https://media.istockphoto.com/id/1528378054/video/female-farmer-face-in-profile-gazes-into-the-distance-field-at-sunset.mp4?s=mp4-640x640-is&k=20&c=111ME7WeNDEk8zsek2BGbmH5Z4jhb0eI6iApoFOkH6Y=",
    },
  },
  {
    name: "TRUST",
    fearState: {
      tag: "DOUBT",
      videoUrl: "https://media.istockphoto.com/id/2222735499/video/longevity-anti-aging-medication-for-asia-woman-menopause-awareness-diagnosis.mp4?s=mp4-640x640-is&k=20&c=gluakWY_Lt18-zmHiNwA783A1I984nENA8c2w8Bnhyo=",
    },
    courageState: {
      tag: "FAITH",
      videoUrl: "https://media.istockphoto.com/id/970345764/video/young-multi-ethnic-friends-drinking-and-celebrating-mardi-gras-at-bar.mp4?s=mp4-640x640-is&k=20&c=FH04ufsz2zIth15euwRoHXLkTvIY-dN9d7AifTrbARY=",
    },
  },
  {
    name: "NOT KNOWING",
    fearState: {
      tag: "THINKING YOU HAVE THE ANSWER",
      videoUrl: "https://media.istockphoto.com/id/2187709399/video/the-thinker-sculpture-deep-in-contemplation-philosophy-concept.mp4?s=mp4-640x640-is&k=20&c=XxR5zEnhXFTaHrQGvQFtzyhdss8XscYoUd9vNEvpGWc=",
    },
    courageState: {
      tag: "ACCEPTANCE THAT NOT KNOWING THE ANSWER",
      videoUrl: "https://media.istockphoto.com/id/2185513209/video/colorful-neon-skeletons-dance-in-sync-for-stunning-vj-loop-visuals.mp4?s=mp4-640x640-is&k=20&c=rRnOwtIaVVo-fJS1B9Vw_3SSBr2dfqg58ia8hGJ9_Yc=",
    },
  },
];

async function postMemory(position, memory) {
  const body = JSON.stringify({ position, ...memory });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  return res.status;
}

async function run() {
  console.log(`Starting memory population — ${memories.length} positions, ${INTERVAL_MS / 1000}s apart...\n`);

  for (let i = 0; i < memories.length; i++) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] Posting position ${i}: "${memories[i].name}"`);

    try {
      const status = await postMemory(i, memories[i]);
      console.log(`  → HTTP ${status}`);
    } catch (err) {
      console.error(`  → ERROR: ${err.message}`);
    }

    if (i < memories.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
    }
  }

  console.log("\nDone! All 16 positions populated.");
}

run();