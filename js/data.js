// Golf Fitness Tracker — Data
// All workout programs and the exercise reference database

const APP_DATA = {

  // ─── Exercise Database ───────────────────────────────────────────────────
  // Every unique exercise across all workouts. exerciseKey must match keys here.
  exercises: {

    // ── Foam Roll / Ball Work ──
    foam_roll_general: {
      name: "Ball/Roller Work",
      description: "Use a foam roller or lacrosse ball to roll out the target areas slowly. Spend extra time on tight spots, pausing for 10–20 seconds on tender areas. This primes muscles and joints for movement.",
      youtubeId: "tL_xIitcc4E",
      cues: ["Move slowly — 1 inch per second", "Pause on tender spots", "Breathe and relax into the roller", "Avoid rolling directly on joints"]
    },

    // ── Movement Prep ──
    cats_and_dogs: {
      name: "Cats & Dogs",
      description: "On hands and knees, alternate between arching your back up (cat) and dropping your belly toward the floor (dog). This mobilizes the entire spine and prepares the thoracic and lumbar regions for rotation.",
      youtubeId: "w73KvAsUU8k",
      cues: ["Cat: tuck pelvis, round spine, chin to chest", "Dog: lift tailbone, let belly drop, look up", "Move slowly and breathe through each position", "Full range of motion — don't rush"]
    },
    seated_hip_wipers: {
      name: "Seated Hip Windshield Wipers",
      description: "Sit on the floor with knees bent and feet flat. Rotate both knees side to side like windshield wipers. Improves hip internal and external rotation — critical for the golf swing.",
      youtubeId: "7VpFsCmLmoU",
      cues: ["Keep feet flat on floor", "Let both knees fall together", "Feel the stretch in the outer hip", "Progress to lifting the feet for added challenge"]
    },
    seated_hip_wipers_get_up: {
      name: "Seated Hip Windshield Wipers (add get up)",
      description: "Same as Seated Hip Windshield Wipers, but after rotating knees to one side, use the momentum to push up to standing. This adds a functional get-up component and trains hip mobility under load.",
      youtubeId: "7VpFsCmLmoU",
      cues: ["Rotate knees to one side", "Push through both hands to rise", "Control the descent back down", "Alternate sides each rep"]
    },
    side_lying_rotation: {
      name: "Side Lying Rotation",
      description: "Lie on your side with hips and knees bent to 90°. Reach your top arm across your body and rotate your thoracic spine, opening the chest toward the ceiling. Essential for golf swing thoracic mobility.",
      youtubeId: "uMWob72Y-EY",
      cues: ["Keep knees stacked and hips still", "Rotate from the mid-back, not the lower back", "Follow your hand with your eyes", "Exhale as you open up"]
    },
    side_lying_rotation_windmill: {
      name: "Side Lying Rotation w/ Windmill",
      description: "Same as Side Lying Rotation, but extend the arm fully overhead and trace a full windmill circle as you rotate. Adds shoulder mobility and thoracic extension to the movement.",
      youtubeId: "uMWob72Y-EY",
      cues: ["Keep hips stacked throughout", "Trace a big circle with your arm", "Let the chest open fully at the top", "Move slowly and with control"]
    },
    half_kneeling_hip_flexor: {
      name: "1/2 Kneeling Hip Flexor & Groin Stretch",
      description: "Kneel on one knee with the other foot forward. Shift your hips forward gently until you feel a stretch in the front of the back hip. Golfers often have tight hip flexors from sitting — this directly addresses that.",
      youtubeId: "bnVfloe6yTo",
      cues: ["Squeeze the glute of the back leg", "Keep your torso tall, no leaning forward", "Feel the stretch in the front of the rear hip", "Hold steady or add a slight side lean for groin"]
    },
    calf_stretch: {
      name: "Calf Stretch",
      description: "Step one foot back and press the heel firmly into the ground. Keep the back leg straight for the gastrocnemius, then slightly bend the knee for the soleus. Important for ankle mobility and a stable golf stance.",
      youtubeId: "YTYQo4WvJHA",
      cues: ["Heel flat on the floor", "Toes point forward, not out", "Straight leg = upper calf; bent knee = lower calf", "Hold 20–30 seconds per side"]
    },
    airplanes: {
      name: "Airplanes",
      description: "Stand on one leg and hinge forward at the hip, extending the free leg behind you and arms out to the sides like airplane wings. Trains single-leg balance, hip stability, and glute activation — key for the follow-through in golf.",
      youtubeId: "9svtEV4vkp0",
      cues: ["Keep a slight bend in the standing knee", "Hinge from the hip, not the waist", "Keep hips level (don't let the free hip hike)", "Eyes down to help balance"]
    },
    figure_4: {
      name: "Figure 4 Stretch",
      description: "Lie on your back, cross one ankle over the opposite knee, and pull the uncrossed leg toward your chest. Stretches the piriformis and external hip rotators. Tight hips limit rotation in the backswing.",
      youtubeId: "-g0nuyTHMrI",
      cues: ["Flex the foot of the crossed leg", "Pull the thigh, not the shin", "Keep your lower back on the floor", "Breathe and relax into the stretch"]
    },
    mini_cobras: {
      name: "Mini Cobras",
      description: "Lie face down with hands under shoulders. Press up slightly using your back muscles — not your arms — lifting only the chest. Strengthens thoracic extensors and counteracts the forward-rounded posture that hurts the golf swing.",
      youtubeId: "azG1fwVVB6g",
      cues: ["Keep elbows slightly bent", "Squeeze shoulder blades together and down", "Only lift as high as your back can take you — don't push with arms", "Hold 1–2 seconds at top"]
    },
    quad_rockers: {
      name: "Quad Rockers",
      description: "Start on hands and knees. Rock your hips back toward your heels (like Child's Pose) then forward past neutral. Mobilizes hips and lumbar spine through a functional range of motion.",
      youtubeId: "GImwCsuBLyo",
      cues: ["Keep hands planted, move from the hips", "Rock back until hips nearly touch heels", "Don't let the lower back collapse", "Breathe out as you rock back"]
    },
    hip_bridge_3pos: {
      name: "3 Position Hip Bridge",
      description: "Lie on your back, knees bent. Perform a glute bridge in three foot positions: feet close together, normal width, and wider than shoulder-width. This activates glutes through different ranges and challenges hip stability.",
      youtubeId: "_hTx5pUttxA",
      cues: ["Drive through heels, not toes", "Squeeze glutes at the top", "Keep knees tracking over toes in each position", "Hold 1–2 seconds at the top of each rep"]
    },
    push_up_plus: {
      name: "Push Up Plus",
      description: "Perform a standard push-up, then at the top position push your shoulder blades apart (protraction) for an extra \"plus\" phase. Activates the serratus anterior for shoulder stability and scapular control.",
      youtubeId: "7ISH0zz9XcM",
      cues: ["Do the full push-up first", "At the top, push the floor away to spread shoulder blades", "Hold the plus position 1 second", "Keep core braced throughout"]
    },
    seated_chest_opener: {
      name: "Seated Chest Opener",
      description: "Sit tall, clasp hands behind your head, and gently draw elbows back while extending the thoracic spine over a foam roller or chair back. Opens the chest and reverses the rounded posture common in golfers.",
      youtubeId: "wXYMYupH3PY",
      cues: ["Sit tall before extending", "Focus the movement on the mid-back, not lower back", "Don't force the extension — let gravity do the work", "Breathe out as you open"]
    },
    leg_swings: {
      name: "Leg Swings",
      description: "Stand next to a wall for balance. Swing one leg forward and back in a controlled arc, then side to side. Dynamically warms up the hip flexors, glutes, adductors, and abductors.",
      youtubeId: "9svtEV4vkp0",
      cues: ["Keep the swinging leg relaxed", "Don't let your trunk twist during front/back swings", "Gradually increase range of motion", "10 swings in each direction per leg"]
    },
    reachbacks: {
      name: "Reachbacks",
      description: "Start on hands and knees. Rotate one arm up toward the ceiling, following your hand with your eyes. This is a thoracic spine rotation drill that directly mimics the backswing rotation needed in golf.",
      youtubeId: "uMWob72Y-EY",
      cues: ["Keep the opposite hand planted", "Rotate from the upper back — hips stay still", "Follow your thumb with your eyes", "Go as far as comfortable, then try for a little more"]
    },
    half_kneeling_adductor: {
      name: "1/2 Kneeling Adductor Mob",
      description: "Kneel with one knee down and the other leg out to the side at 90°. Shift your weight sideways over the straight leg, stretching the inner thigh (adductor). Hip adductor tightness is a common limiter of the golf swing.",
      youtubeId: "AfYuwqZVTY4",
      cues: ["Keep your torso tall", "Shift weight laterally, don't lean forward", "Feel the stretch in the inner thigh of the straight leg", "Rock in and out for a dynamic stretch"]
    },
    split_stance_twist: {
      name: "Split Stance Twist",
      description: "Take a staggered stance (one foot forward). Hold a club or arms crossed and rotate your torso side to side. This rehearses the rotational demand of the golf swing in a stable base.",
      youtubeId: "uMWob72Y-EY",
      cues: ["Keep weight evenly distributed", "Rotate from the shoulders, not just the arms", "Hips can follow slightly — this is a golf-specific movement", "Move smoothly, no jerking"]
    },

    // ── Strength ──
    goblet_squat: {
      name: "Goblet Squat",
      description: "Hold a dumbbell vertically at chest height. Squat deep, keeping your elbows inside your knees to open the hips. Builds lower body strength and hip mobility simultaneously — a foundational golf fitness exercise.",
      youtubeId: "CkFzgR55gho",
      cues: ["Chest up, elbows inside knees", "Break at hips and knees together", "Squat until thighs are parallel or below", "Drive through the full foot to stand"]
    },
    goblet_quarter_squat: {
      name: "Goblet 1 & 1/4 Squat",
      description: "Perform a full Goblet Squat, then rise only 1/4 of the way up, pause, drop back to the bottom, then stand fully. The extra time under tension in the bottom position builds significant quad and glute strength.",
      youtubeId: "CkFzgR55gho",
      cues: ["Full squat → 1/4 up → back to bottom → full stand = 1 rep", "Keep chest up and knees tracking toes throughout", "Control the descent — don't drop", "The pause at the bottom is where it counts"]
    },
    split_squat: {
      name: "Split Squats (use bottom stair)",
      description: "Stand in a lunge position with the rear foot elevated on the bottom stair. Lower straight down until the back knee nearly touches the ground. Elevating the rear foot increases range of motion and hip flexor stretch.",
      youtubeId: "2YhcpVkhrH4",
      cues: ["Front foot far enough forward that shin stays vertical", "Lower straight down, don't lean forward", "Rear knee drops toward the floor", "Drive through the front heel to stand"]
    },
    lateral_split_squat: {
      name: "Lateral Split Squat (use 1st or 2nd stair)",
      description: "Stand sideways to the stairs with one foot on the step. Squat laterally toward the lower foot, sitting into that hip. Trains lateral hip strength and the adductors, which control the squat in the golf address position.",
      youtubeId: "2YhcpVkhrH4",
      cues: ["Sit the hips back and down, not forward", "Keep the elevated leg relatively straight", "Chest up throughout", "Push through the heel of the working leg"]
    },
    offset_squat: {
      name: "Offset Squat",
      description: "Hold a single dumbbell at one shoulder. Squat normally. The asymmetric load challenges core stability and lateral trunk muscles to resist rotation, mimicking the demands of the golf swing.",
      youtubeId: "CkFzgR55gho",
      cues: ["Hold dumbbell at shoulder, not hanging by side", "Resist the tendency to lean toward the weight", "Keep hips level throughout", "Alternate which side holds the weight each set"]
    },
    two_wide_two_narrow: {
      name: "2 Wide / 2 Narrow",
      description: "In a squat hold, step out wide twice then back in narrow twice in a rhythmic pattern. This cardio drill challenges lateral movement and hip stability while keeping the heart rate up between strength supersets.",
      youtubeId: "",
      cues: ["Stay low in a squat the whole time", "Quick, controlled steps", "Keep chest up and core braced", "Drive from the hips, not just the feet"]
    },
    db_1arm_row: {
      name: "DB 1 Arm Row",
      description: "Plant one hand and knee on a bench, hold a dumbbell in the other hand. Row the dumbbell to your hip, driving the elbow back. Builds the lat and mid-back strength needed to generate power in the golf swing.",
      youtubeId: "pYcpY20QaE8",
      cues: ["Keep back flat — don't rotate", "Drive elbow back toward hip, not up toward shoulder", "Full stretch at bottom, full contraction at top", "Don't use momentum"]
    },
    hip_raises: {
      name: "Hip Raises (Glute Bridge)",
      description: "Lie on your back with knees bent, feet flat. Drive through your heels to lift your hips to a straight line from knee to shoulder. Activates glutes and hamstrings, which are key drivers of power in the golf swing.",
      youtubeId: "_hTx5pUttxA",
      cues: ["Drive through heels, not toes", "Squeeze glutes hard at the top", "Keep knees from splaying out", "Hold 1–2 seconds at top for full activation"]
    },
    pb_ts: {
      name: "PB T's (Physioball)",
      description: "Lie face down over a physioball with arms hanging. Raise both arms out to form a T, squeezing the shoulder blades together. Strengthens the rear deltoids and mid-back for a stable, powerful golf posture.",
      youtubeId: "TwdRSZbBK4s",
      cues: ["Thumbs point up (external rotation)", "Squeeze shoulder blades together and down", "Don't shrug the neck", "Control the return — don't drop the arms"]
    },
    plank_arm_reach: {
      name: "Plank w/ Arm Reach",
      description: "Hold a plank position and slowly extend one arm forward, holding for 2 seconds before switching. Challenges anti-rotational core stability — the same quality needed to resist unwanted trunk movement in the swing.",
      youtubeId: "Y1h176ryVuk",
      cues: ["Don't let hips rotate when arm lifts", "Keep a neutral spine — no sagging or piking", "Move slowly and with control", "Breathe throughout"]
    },
    half_side_plank_leg_raise: {
      name: "1/2 Side Plank w/ Leg Raise",
      description: "Support yourself on one forearm and the same-side knee (not foot). Raise the top leg to hip height and hold. This targets the lateral hip stabilizers and obliques without the full load of a traditional side plank.",
      youtubeId: "5iNDm4NbBQk",
      cues: ["Keep hips stacked vertically", "Raise the top leg to hip height, hold 2 seconds", "Don't let the bottom hip sag", "Keep the top foot flexed"]
    },
    half_side_plank_leg_lift: {
      name: "1/2 Side Plank w/ Leg Lift",
      description: "Same as the 1/2 Side Plank w/ Leg Raise — support on forearm and bottom knee, then lift the top leg. Targets the obliques and hip abductors in an isometric hold with dynamic leg movement.",
      youtubeId: "5iNDm4NbBQk",
      cues: ["Hips stacked, don't rotate forward", "Lift top leg slowly — feel the hip abductor work", "Keep bottom hip off the floor", "Breathe steadily throughout"]
    },
    jumping_jacks: {
      name: "Jumping Jacks",
      description: "Classic cardio drill to elevate heart rate between superset strength exercises. Keep the movement controlled and land softly to protect joints.",
      youtubeId: "",
      cues: ["Land softly on the balls of your feet", "Arms reach fully overhead", "Keep a slight bend in the knees on landing", "Breathe rhythmically"]
    },
    step_ups: {
      name: "Step Ups",
      description: "Step up onto a stair or box with one foot, driving through the heel to stand fully, then step down. Trains single-leg strength and balance. Keep the trail leg from pushing off the ground.",
      youtubeId: "bhuB2Msz3Rg",
      cues: ["Drive through the heel of the step-up leg", "Don't push off the back foot — make the working leg do it all", "Stand fully upright at the top", "Control the descent"]
    },
    db_1leg_deadlift: {
      name: "DB 1 Leg Deadlift",
      description: "Stand on one leg holding dumbbells. Hinge at the hip, lowering the weights toward the floor while the free leg extends behind for counterbalance. Trains posterior chain strength and single-leg stability — crucial for the golf downswing.",
      youtubeId: "iS7atZhcRnw",
      cues: ["Hinge from the hip, not the waist", "Keep a flat back throughout", "Slight bend in the standing knee", "Free leg stays in line with the torso — don't let it splay out"]
    },
    hacky_sack: {
      name: "Hacky Sack (balance drill)",
      description: "Stand on one leg and \"kick\" the opposite knee up like kicking a hacky sack. Challenges single-leg balance and hip flexor activation. Use as an active recovery drill between superset strength sets.",
      youtubeId: "",
      cues: ["Stand tall, core braced", "Drive the knee up with control", "Find a focal point to help with balance", "Keep the standing ankle stable — don't let it roll"]
    },
    squat_hold_side_tap: {
      name: "Squat Hold w/ Side Tap",
      description: "Hold an isometric squat position and repeatedly tap one foot out to the side and back. Challenges lateral hip stability and glute activation while maintaining a squat position.",
      youtubeId: "",
      cues: ["Hold squat depth throughout — don't rise on the tap", "Tap the foot lightly, keep weight in the stationary leg", "Keep chest up and core braced", "Alternate sides or do all reps on one side, then switch"]
    },
    skater_jumps: {
      name: "Skater Jumps",
      description: "Leap laterally from one leg to the other, landing softly and holding each landing for a beat. Trains lateral power and single-leg landing mechanics — translates directly to rotational power in golf.",
      youtubeId: "gS4F_YrwZVs",
      cues: ["Land on one foot and hold 1 second before jumping again", "Reach the opposite hand toward the landing foot", "Land softly — absorb through hips and knees", "Drive off the whole foot, not just the toes"]
    },
    floor_press_1arm: {
      name: "1 Arm DB Floor Press",
      description: "Lie on the floor holding one dumbbell, elbow resting on the floor. Press the dumbbell up and fully lock out, then lower slowly until the elbow touches the floor. The floor limits range to protect the shoulder and demands core stability.",
      youtubeId: "Xu7QaebaQRI",
      cues: ["Plant feet flat on the floor", "Don't let the torso rotate — keep ribs down", "Full lockout at the top", "Elbow at roughly 45° from the body"]
    },
    front_plank_knee_tap: {
      name: "Front Plank w/ Knee Tap",
      description: "Hold a plank position and slowly bring one knee to touch the floor, then return to plank. Challenges lumbar stability as weight shifts with each tap.",
      youtubeId: "Y1h176ryVuk",
      cues: ["Lower the knee with control — don't drop", "Hips stay level — don't rock side to side", "Keep the rest of the body still", "Alternate knees each rep"]
    },
    pb_dead_bug: {
      name: "PB Dead Bug (Physioball)",
      description: "Lie on your back holding a physioball between your hands and knees. Extend opposite arm and leg while keeping the ball in contact. Trains deep core stability and anti-extension control.",
      youtubeId: "qeiIpDJ85Qs",
      cues: ["Press lower back into the floor — no gap", "Extend slowly — don't rush", "Keep the ball from moving", "Exhale as you extend"]
    },
    half_kneeling_chop: {
      name: "DB 1/2 Kneeling Chop",
      description: "Kneel on one knee. Hold a dumbbell with both hands and pull it from high across your body diagonally to low. This rotational pattern directly trains the golf swing movement pattern.",
      youtubeId: "KOh8cxe2ziE",
      cues: ["Lead with the hips, not just the arms", "Resist the rotation at the end — don't just let it pull you", "Keep the back knee down", "Control the weight back to the start — eccentric matters"]
    },
    pb_supermans: {
      name: "PB Supermans (Physioball)",
      description: "Lie face down over a physioball. Extend your arms and legs simultaneously off the ball, like Superman flying. Strengthens the posterior chain — glutes, hamstrings, and back extensors.",
      youtubeId: "TwdRSZbBK4s",
      cues: ["Squeeze glutes as you extend", "Keep the neck neutral — don't strain upward", "Hold 2–3 seconds at the top", "Breathe out as you extend"]
    },
    band_pull_apart: {
      name: "Band Pull Apart",
      description: "Hold a resistance band at shoulder width with arms extended. Pull the band apart until it touches your chest. Strengthens rear deltoids and mid-back, correcting the forward-rounded posture that robs golfers of rotation.",
      youtubeId: "9IWz8v44mXs",
      cues: ["Keep arms straight throughout", "Squeeze shoulder blades together at full pull", "Don't let elbows bend to 'cheat' the range", "Control the return — don't let band snap back"]
    },
    side_plank_tuck_under: {
      name: "Side Plank w/ Tuck Under",
      description: "Hold a full side plank (foot stacked or staggered). Reach the top hand under your body, rotating the spine, then return to plank. Also called \"thread the needle\". Trains rotational stability.",
      youtubeId: "5iNDm4NbBQk",
      cues: ["Keep hips high — don't sag when you rotate", "Reach as far under as you can", "Return to the full side plank before the next rep", "Breathe — exhale as you thread under"]
    },
    floor_slides: {
      name: "Floor Slides",
      description: "Lie on your back with arms bent, elbows on the floor at 90°. Slide arms overhead while keeping elbows and wrists in contact with the floor. Mobilizes the thoracic spine and shoulder girdle.",
      youtubeId: "KBS04W-O5es",
      cues: ["Keep lower back pressed to the floor", "Elbows and wrists stay in contact with the floor the whole time", "Move slowly — feel the shoulder blade glide", "Only go as far overhead as you can without losing the back contact"]
    },
    half_kneeling_windmill: {
      name: "1/2 Kneeling DB Windmill",
      description: "Kneel on one knee with a dumbbell in the overhead hand. Hinge sideways at the hip, lowering the opposite hand toward the floor while the DB stays pointed up. Builds shoulder stability and lateral hip flexibility simultaneously.",
      youtubeId: "1N1Qs9FO4GU",
      cues: ["Keep the dumbbell locked overhead — don't let it drift", "Hinge sideways from the hip, not forward", "Eyes on the dumbbell throughout", "Move slowly — this is a mobility drill, not a speed drill"]
    },
    pb_knee_tuck: {
      name: "PB Knee Tuck (Physioball)",
      description: "Start in a push-up position with shins on a physioball. Draw both knees toward your chest, rolling the ball in, then extend back out. Demands high core stability and hip flexor control.",
      youtubeId: "qeiIpDJ85Qs",
      cues: ["Keep hips level — don't pike up too early", "Round the lower back slightly as you tuck (that's correct form here)", "Control the extension — don't let legs fly out", "Breathe out as you tuck"]
    },
    side_plank_leg_swing: {
      name: "Side Plank w/ Leg Swing",
      description: "Hold a side plank and swing the top leg forward and back in a controlled arc. Trains lateral trunk stability while adding a dynamic hip flexion/extension challenge.",
      youtubeId: "5iNDm4NbBQk",
      cues: ["Keep hips stacked and high", "Swing leg with control — no momentum", "Don't let the hip drop when the leg swings forward", "Keep the swing leg foot flexed"]
    },
    mountain_climber: {
      name: "Mountain Climber",
      description: "Start in a push-up position. Drive one knee toward your chest, then quickly alternate legs in a running motion. A full-body cardio drill that also challenges core stability and shoulder endurance.",
      youtubeId: "UOGvtqv856A",
      cues: ["Keep hips level — don't pike", "Drive the knee fully toward the chest", "Plant hands directly under shoulders", "Keep the pace you can control"]
    },

    // ── Stretch ──
    half_kneeling_hip_flexor_stretch: {
      name: "1/2 Kneeling Hip Flexor Stretch",
      description: "Kneel with one knee on the floor and the other foot forward. Shift forward until you feel a stretch in the front of the rear hip. Hold for 30 seconds. Essential for undoing the hip flexor tightness built up from sitting.",
      youtubeId: "bnVfloe6yTo",
      cues: ["Squeeze the glute of the rear leg to deepen the stretch", "Keep torso tall — don't lean forward", "Breathe and relax into the stretch", "Optional: reach overhead on the rear-leg side for a bigger stretch"]
    },
    supine_hip_to_twist: {
      name: "Supine Hip to Twist",
      description: "Lie on your back, pull one knee to your chest, then guide it across your body into a spinal twist. Hold 30 seconds. Releases the hip and lower back, both of which are taxed by rotational golf movements.",
      youtubeId: "-g0nuyTHMrI",
      cues: ["Keep the opposite shoulder on the floor", "Use your hand to guide the knee across — don't force it", "Look away from the crossed leg for a bigger twist", "Breathe deeply to encourage the release"]
    },
    pec_stretch_wall: {
      name: "Pec Stretch (wall)",
      description: "Place one forearm on a wall with elbow at 90°. Gently rotate your body away from the wall. Stretches the pectorals and anterior shoulder. Tight pecs limit thoracic extension and rotation in the backswing.",
      youtubeId: "bnVfloe6yTo",
      cues: ["Keep elbow at 90° on the wall", "Gently rotate body away — no bouncing", "Feel the stretch across the chest, not the shoulder", "Hold 30 seconds each side"]
    },
    childs_pose_reach: {
      name: "Child's Pose w/ Reach",
      description: "From Child's Pose, walk both hands to one side to add a lateral stretch to the thoracic spine and lats. Decompresses the spine and stretches the side that does the most work in your dominant swing side.",
      youtubeId: "uMWob72Y-EY",
      cues: ["Hips sink back toward heels", "Walk hands as far as comfortable", "Breathe into the stretch — feel the side expand", "Hold 30 seconds each side"]
    }
  },

  // ─── Programs ─────────────────────────────────────────────────────────────
  programs: [
    {
      id: "nov2022",
      title: "November 2022",
      subtitle: "2–3x/week · Workout A/B rotation",
      workouts: [
        {
          id: "nov2022_a",
          label: "Workout A",
          style: "Supersets",
          sections: [
            {
              id: "warmup",
              title: "Ball/Roller — 5 min",
              note: "Legs, Hips, Back",
              type: "list",
              items: [{ exerciseKey: "foam_roll_general" }]
            },
            {
              id: "movement_prep",
              title: "Movement Prep",
              note: "1 × 5–8 reps",
              type: "list",
              items: [
                { exerciseKey: "cats_and_dogs" },
                { exerciseKey: "reachbacks" },
                { exerciseKey: "seated_hip_wipers_get_up" },
                { exerciseKey: "half_kneeling_adductor" },
                { exerciseKey: "airplanes" },
                { exerciseKey: "split_stance_twist" }
              ]
            },
            {
              id: "strength",
              title: "Strength",
              note: "3 × 10 reps",
              type: "superset",
              items: [
                { type: "superset", label: "A", exercises: [
                  { exerciseKey: "offset_squat" },
                  { exerciseKey: "two_wide_two_narrow", note: "30 sec" }
                ]},
                { type: "superset", label: "B", exercises: [
                  { exerciseKey: "lateral_split_squat", note: "use 1st or 2nd stair" },
                  { exerciseKey: "step_ups", note: "30 sec" }
                ]},
                { type: "superset", label: "C", exercises: [
                  { exerciseKey: "db_1leg_deadlift" },
                  { exerciseKey: "mountain_climber", note: "30 sec" }
                ]},
                { type: "superset", label: "D", exercises: [
                  { exerciseKey: "half_side_plank_leg_lift" },
                  { exerciseKey: "skater_jumps", note: "30 sec" }
                ]}
              ]
            },
            {
              id: "stretch",
              title: "Stretch",
              note: "30 sec / side",
              type: "list",
              items: [
                { exerciseKey: "half_kneeling_hip_flexor_stretch" },
                { exerciseKey: "supine_hip_to_twist" }
              ]
            }
          ]
        },
        {
          id: "nov2022_b",
          label: "Workout B",
          style: "Circuit",
          sections: [
            {
              id: "warmup",
              title: "Ball/Roller — 5 min",
              note: "Legs, Hips, Back",
              type: "list",
              items: [{ exerciseKey: "foam_roll_general" }]
            },
            {
              id: "movement_prep",
              title: "Movement Prep",
              note: "1 × 5–8 reps",
              type: "list",
              items: [
                { exerciseKey: "cats_and_dogs" },
                { exerciseKey: "reachbacks" },
                { exerciseKey: "seated_hip_wipers_get_up" },
                { exerciseKey: "half_kneeling_adductor" },
                { exerciseKey: "airplanes" },
                { exerciseKey: "split_stance_twist" }
              ]
            },
            {
              id: "strength",
              title: "Strength — Circuit",
              note: "3 × 10–12 reps",
              type: "list",
              items: [
                { exerciseKey: "floor_slides" },
                { exerciseKey: "floor_press_1arm" },
                { exerciseKey: "half_kneeling_windmill" },
                { exerciseKey: "db_1arm_row" },
                { exerciseKey: "pb_knee_tuck" },
                { exerciseKey: "half_kneeling_chop" },
                { exerciseKey: "band_pull_apart" },
                { exerciseKey: "side_plank_leg_swing" }
              ]
            },
            {
              id: "stretch",
              title: "Stretch",
              note: "30 sec / side",
              type: "list",
              items: [
                { exerciseKey: "pec_stretch_wall" },
                { exerciseKey: "childs_pose_reach" }
              ]
            }
          ]
        }
      ]
    },

    {
      id: "feb2021",
      title: "February 2021",
      subtitle: "Workout A/B rotation",
      workouts: [
        {
          id: "feb2021_a",
          label: "Workout A",
          style: "Supersets",
          sections: [
            {
              id: "warmup",
              title: "Ball/Roller — 5 min",
              note: "Legs, Hips, Back",
              type: "list",
              items: [{ exerciseKey: "foam_roll_general" }]
            },
            {
              id: "movement_prep",
              title: "Movement Prep",
              note: "1 × 5–8 reps",
              type: "list",
              items: [
                { exerciseKey: "mini_cobras" },
                { exerciseKey: "quad_rockers" },
                { exerciseKey: "seated_hip_wipers" },
                { exerciseKey: "side_lying_rotation_windmill" },
                { exerciseKey: "hip_bridge_3pos" },
                { exerciseKey: "push_up_plus" },
                { exerciseKey: "seated_chest_opener" },
                { exerciseKey: "leg_swings" }
              ]
            },
            {
              id: "strength",
              title: "Strength",
              note: "3 × 10 reps",
              type: "superset",
              items: [
                { type: "superset", label: "A", exercises: [
                  { exerciseKey: "goblet_quarter_squat" },
                  { exerciseKey: "jumping_jacks", note: "30 sec" }
                ]},
                { type: "superset", label: "B", exercises: [
                  { exerciseKey: "split_squat", note: "use bottom stair" },
                  { exerciseKey: "step_ups", note: "30 sec" }
                ]},
                { type: "superset", label: "C", exercises: [
                  { exerciseKey: "db_1leg_deadlift" },
                  { exerciseKey: "hacky_sack", note: "30 sec" }
                ]},
                { type: "superset", label: "D", exercises: [
                  { exerciseKey: "squat_hold_side_tap" },
                  { exerciseKey: "skater_jumps", note: "30 sec" }
                ]}
              ]
            }
          ]
        },
        {
          id: "feb2021_b",
          label: "Workout B",
          style: "Circuit",
          sections: [
            {
              id: "warmup",
              title: "Ball/Roller — 5 min",
              note: "Legs, Hips, Back",
              type: "list",
              items: [{ exerciseKey: "foam_roll_general" }]
            },
            {
              id: "movement_prep",
              title: "Movement Prep",
              note: "1 × 5–8 reps",
              type: "list",
              items: [
                { exerciseKey: "mini_cobras" },
                { exerciseKey: "quad_rockers" },
                { exerciseKey: "seated_hip_wipers" },
                { exerciseKey: "side_lying_rotation_windmill" },
                { exerciseKey: "hip_bridge_3pos" },
                { exerciseKey: "push_up_plus" },
                { exerciseKey: "seated_chest_opener" },
                { exerciseKey: "leg_swings" }
              ]
            },
            {
              id: "strength",
              title: "Strength — Circuit",
              note: "3 × 10–12 reps",
              type: "list",
              items: [
                { exerciseKey: "floor_press_1arm" },
                { exerciseKey: "front_plank_knee_tap" },
                { exerciseKey: "db_1arm_row" },
                { exerciseKey: "pb_dead_bug" },
                { exerciseKey: "half_kneeling_chop" },
                { exerciseKey: "pb_supermans" },
                { exerciseKey: "band_pull_apart" },
                { exerciseKey: "side_plank_tuck_under" }
              ]
            }
          ]
        }
      ]
    },

    {
      id: "aug2020",
      title: "August 2020",
      subtitle: "Single workout with intervals",
      workouts: [
        {
          id: "aug2020_a",
          label: "Workout",
          style: "Standard",
          sections: [
            {
              id: "warmup",
              title: "Ball/Roller — 5 min",
              note: "Legs, Hips, Upper Back",
              type: "list",
              items: [{ exerciseKey: "foam_roll_general" }]
            },
            {
              id: "movement_prep",
              title: "Movement Prep",
              note: "1 × 5–8 reps",
              type: "list",
              items: [
                { exerciseKey: "cats_and_dogs" },
                { exerciseKey: "seated_hip_wipers" },
                { exerciseKey: "side_lying_rotation" },
                { exerciseKey: "half_kneeling_hip_flexor" },
                { exerciseKey: "calf_stretch" },
                { exerciseKey: "airplanes" },
                { exerciseKey: "figure_4" }
              ]
            },
            {
              id: "intervals",
              title: "Intervals",
              note: "6–8 rounds · 45 sec on / 75 sec off",
              type: "info",
              items: []
            },
            {
              id: "strength",
              title: "Strength",
              note: "3 × 8–10 reps",
              type: "list",
              items: [
                { exerciseKey: "goblet_squat" },
                { exerciseKey: "push_up_plus" },
                { exerciseKey: "split_squat", note: "use bottom stair" },
                { exerciseKey: "db_1arm_row" },
                { exerciseKey: "hip_raises" },
                { exerciseKey: "pb_ts" },
                { exerciseKey: "plank_arm_reach" },
                { exerciseKey: "half_side_plank_leg_raise" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
