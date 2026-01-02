
import { PerkCategory, PerkDetails, GameStatus, Role } from './types';

export const GAME_STATUSES: GameStatus[] = [
  { name: 'Exhausted', effect: 'Prevents the use of sprint-based perks.', icon: '🏃' },
  { name: 'Exposed', effect: 'Allows the killer to down you in a single basic hit.', icon: '💀' },
  { name: 'Broken', effect: 'Prevents you from being healed past the injured state.', icon: '💔' },
  { name: 'Haste', effect: 'Increases your base movement speed.', icon: '⚡' },
  { name: 'Oblivious', effect: 'Prevents you from hearing the killer\'s terror radius.', icon: '👂' },
  { name: 'Blindness', effect: 'Prevents you from seeing Auras.', icon: '🕶️' },
  { name: 'Hemorrhage', effect: 'Increases regression of healing progress.', icon: '🩸' },
  { name: 'Mangled', effect: 'Increases the time required to heal.', icon: '🩹' },
  { name: 'Endurance', effect: 'Allows you to withstand a hit that would put you in the dying state.', icon: '🛡️' },
  { name: 'Incapacitated', effect: 'Prevents interacting with complex objects (Generators, Totems).', icon: '⛓️' },
];

export const INITIAL_PERKS: PerkDetails[] = [
  // --- SURVIVOR PERKS (50 ADDITIONAL + ORIGINALS) ---
  {
    id: 'decisive-strike',
    name: 'Decisive Strike',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.SURVIVAL,
    source: 'Laurie Strode',
    description: 'After being unhooked, Decisive Strike activates for 60 seconds. If grabbed or picked up by the Killer, succeed a Skill Check to escape and stun the Killer for 4 seconds.',
    hiddenMechanics: ['Deactivates if you perform a Conspicuous Action.', 'Increases your chance to be the Obsession.', 'The stun is 4 seconds flat.'],
    usageSteps: ['Get unhooked.', 'Avoid doing gens or healing others to keep it active.', 'If the killer tunnels you, wait for the pickup.', 'Hit the skill check.'],
    bestCaseScenario: 'Escaping the killer right next to an open exit gate.',
    untoldTips: 'Killers will often slug you to wait out the 60s timer. Use that time to crawl to a safe spot.',
    quiz: [{
      question: "What action deactivates Decisive Strike early?",
      options: ["Running", "Vaulting", "Repairing a Generator", "Crouching"],
      correctIndex: 2,
      explanation: "Repairing, healing, or sabotaging are 'Conspicuous Actions' that disable DS."
    }]
  },
  {
    id: 'balanced-landing',
    name: 'Balanced Landing',
    role: Role.SURVIVOR,
    rarity: 'Rare',
    category: PerkCategory.CHASE,
    source: 'Nea Karlsson',
    description: 'When falling from a height, stagger duration is reduced by 75 % and you sprint at 150 % speed for 3 seconds.',
    hiddenMechanics: ['Reduces grunts of pain when falling.', 'Causes Exhausted for 40 seconds.'],
    usageSteps: ['Find a map with verticality (like Haddonfield).', 'Jump from a second floor.', 'Use the burst to reach the next loop.'],
    bestCaseScenario: 'Dropping from the Coal Tower to instantly gain 20m on the killer.',
    untoldTips: 'The 75% stagger reduction works even while Exhausted, though you won\'t get the speed.',
    quiz: [{
      question: "Do you get the speed burst if you are already Exhausted?",
      options: ["Yes", "No", "Only if healthy", "Only on some maps"],
      correctIndex: 1,
      explanation: "Exhausted status prevents the speed burst but not the stagger reduction."
    }]
  },
  {
    id: 'mettle-of-man',
    name: 'Mettle of Man',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.SURVIVAL,
    source: 'Ash Williams',
    description: 'After taking 2 Protection Hits, the perk activates. The next time you would be put in the dying state, the hit is ignored.',
    hiddenMechanics: ['Reveals your aura to the killer if you heal to full after activation.', 'Extremely difficult to trigger consistently.'],
    usageSteps: ['Take hits for teammates near hooks.', 'Get the 2nd stack.', 'Survive a hit that should have downed you.'],
    bestCaseScenario: 'Bodyblocking for the last survivor to reach the gate and living to tell the tale.',
    untoldTips: 'Works best when paired with Breakout or Empathy.',
    quiz: [{
      question: "How many protection hits are required to activate Mettle of Man?",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      explanation: "It was changed from 3 hits to 2 hits in a recent balance patch."
    }]
  },
  {
    id: 'autodidact',
    name: 'Autodidact',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.SURVIVAL,
    source: 'Adam Francis',
    description: 'Start with -25 % progress penalty on healing skill checks. Successes grant tokens (max 5). Each token adds +15 % progress to Great Skill Checks.',
    hiddenMechanics: ['Does not work with Med-kits.', 'High RNG reliance.'],
    usageSteps: ['Heal teammates early to farm tokens.', 'Hope for skill checks.', 'Instantly heal 50% of a health bar with one late-game check.'],
    bestCaseScenario: 'Saving a teammate in 2 seconds because you hit two skill checks in a row.',
    untoldTips: 'Terrible early game, god-tier late game.',
    quiz: [{
      question: "Does Autodidact work while using a Med-kit?",
      options: ["Yes", "No", "Only with addons", "Only if injured"],
      correctIndex: 1,
      explanation: "Autodidact is disabled when using a Med-kit to heal."
    }]
  },
  {
    id: 'deception',
    name: 'Deception',
    role: Role.SURVIVOR,
    rarity: 'Rare',
    category: PerkCategory.STEALTH,
    source: 'Elodie Rakoto',
    description: 'Interact with a locker while sprinting to not enter it, but trigger a loud noise notification and hide your scratch marks for 3 seconds.',
    hiddenMechanics: ['Locker doors swing open visually.', 'Cooldown of 40 seconds.'],
    usageSteps: ['Run past a locker in a chase.', 'Tap the interact button.', 'Keep running while the killer checks the locker.'],
    bestCaseScenario: 'Completely bamboozling a killer in a high-wall jungle gym.',
    untoldTips: 'Pair with Head On for the ultimate mindgame: did I enter or not?',
    quiz: [{
      question: "How long are scratch marks hidden after using Deception?",
      options: ["1s", "3s", "5s", "None"],
      correctIndex: 1,
      explanation: "Deception hides your scratch marks and pools of blood for 3 seconds."
    }]
  },
  {
    id: 'soul-guard',
    name: 'Soul Guard',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.SURVIVAL,
    source: 'Cheryl Mason',
    description: 'Gain Endurance for 8 seconds after being healed from the dying state. If cursed by a Hex, you can fully recover from the dying state.',
    hiddenMechanics: ['Allows infinite self-pickups if a Hex is active.', 'Counters slugging killers perfectly.'],
    usageSteps: ['Wait to be downed.', 'If you see a Hex icon, recover to full.', 'Stand up and tank a hit immediately.'],
    bestCaseScenario: 'Picking yourself up 3 times in a row while the killer tries to slug for the 4k.',
    untoldTips: 'Pairs well with Unbreakable for the recovery speed.',
    quiz: [{
      question: "What condition allows Soul Guard to pick you up infinitely?",
      options: ["Being the Obsession", "A Hex Totem is active", "You have a Med-kit", "Everyone is slugged"],
      correctIndex: 1,
      explanation: "Soul Guard only allows full recovery while you are under the effect of a Hex."
    }]
  },
  {
    id: 'flashbang',
    name: 'Flashbang',
    role: Role.SURVIVOR,
    rarity: 'Rare',
    category: PerkCategory.DISRUPTION,
    source: 'Leon S. Kennedy',
    description: 'After 50 % generator repair, hide in a locker to craft a flash grenade. Drop it to blind and deafen the killer.',
    hiddenMechanics: ['Makes a distinct crafting sound.', 'Dropped grenades have a slight delay before exploding.'],
    usageSteps: ['Do gens.', 'Craft bang.', 'Drop it at a pallet or during a carry save.'],
    bestCaseScenario: 'Rescuing a teammate from the killer\'s shoulder with a perfectly timed locker-exit bang.',
    untoldTips: 'You can drop it while vaulting or being carried to confuse the killer.',
    quiz: [{
      question: "What percentage of gen progress is needed to craft a Flashbang?",
      options: ["25%", "50%", "75%", "100%"],
      correctIndex: 1,
      explanation: "You need 50% total repair progress to prime the craft."
    }]
  },
  {
    id: 'wiretap',
    name: 'Wiretap',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.INFO,
    source: 'Ada Wong',
    description: 'After 33 % generator repair, install a trap. When the killer is within 14 meters of the generator, their aura is revealed to all survivors.',
    hiddenMechanics: ['Deactivates if the killer kicks the generator.', 'Lasts for 80 seconds if not kicked.'],
    usageSteps: ['Trap a central gen.', 'Loop the killer around that gen.', 'Give your whole team wall-hacks for the chase.'],
    bestCaseScenario: 'Turning a standard loop into a death trap because you see every killer mindgame.',
    untoldTips: 'Combine with Blast Mine to punish the killer for trying to remove the Wiretap.',
    quiz: [{
      question: "How long does the aura reveal last if the gen isn't kicked?",
      options: ["30s", "60s", "80s", "Indefinitely"],
      correctIndex: 2,
      explanation: "Wiretap stays active for 80 seconds maximum."
    }]
  },
  {
    id: 'background-player',
    name: 'Background Player',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.CHASE,
    source: 'Renato Lyra',
    description: 'When another survivor is picked up, break into a sprint at 200 % speed for 5 seconds.',
    hiddenMechanics: ['Highest speed multiplier in the game (200%).', 'Induces Exhaustion for 40s.'],
    usageSteps: ['Stay near a chase.', 'Wait for the pickup.', 'Zoom across the map for a flashlight or flashbang save.'],
    bestCaseScenario: 'Crossing half the map to save a teammate before the killer can reach a hook.',
    untoldTips: 'Don\'t use it just to run away; it\'s designed for altruism.',
    quiz: [{
      question: "What is the speed multiplier of Background Player?",
      options: ["150%", "175%", "200%", "250%"],
      correctIndex: 2,
      explanation: "It provides a 200% speed boost, significantly faster than Sprint Burst."
    }]
  },
  {
    id: 'dramaturgy',
    name: 'Dramaturgy',
    role: Role.SURVIVOR,
    rarity: 'Rare',
    category: PerkCategory.SURVIVAL,
    source: 'Nicolas Cage',
    description: 'While healthy, press the active ability button to run with high knees. Gain Haste and one of 4 random effects (Exposed, Rare Item, 2s Haste, or Scream).',
    hiddenMechanics: ['Fun factor is 10/10.', 'Item generation can give Purple Flashlights/Medkits.'],
    usageSteps: ['Wait until you are in a safe spot.', 'Active the high knees.', 'Hope for an item or more haste.'],
    bestCaseScenario: 'Generating a purple med-kit right when the team needs it most.',
    untoldTips: 'Do not use this while the killer is right behind you; the 25% chance of screaming will kill you.',
    quiz: [{
      question: "Which of these is NOT a random effect of Dramaturgy?",
      options: ["Exposed", "Scream", "Instantly heal", "Gain a Rare Item"],
      correctIndex: 2,
      explanation: "It can expose you, make you scream, or give an item, but it never heals."
    }]
  },
  {
    id: 'champion-of-light',
    name: 'Champion of Light',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.CHASE,
    source: 'Alan Wake',
    description: 'While shining a flashlight, move 50 % faster. Successfully blinding a killer causes them to suffer 20 % Hindered for 6 seconds.',
    hiddenMechanics: ['Stacks with other Haste effects.', 'Makes flashlight saves much safer.'],
    usageSteps: ['Equip a good flashlight.', 'Blind the killer at a pallet.', 'Use the Hindered status to reach the next building easily.'],
    bestCaseScenario: 'Blinding a Blight or Nurse to slow their movement down significantly.',
    untoldTips: 'You don\'t need to be in a chase for the move speed to work.',
    quiz: [{
      question: "How much Hindered is applied to the killer?",
      options: ["5%", "10%", "20%", "50%"],
      correctIndex: 2,
      explanation: "It applies a heavy 20% Hindered penalty."
    }]
  },
  {
    id: 'wicked',
    name: 'Wicked',
    role: Role.SURVIVOR,
    rarity: 'Rare',
    category: PerkCategory.SURVIVAL,
    source: 'Sable Ward',
    description: 'Your unhook attempts in the Basement always succeed. When unhooked (anywhere), the killer\'s aura is shown for 20 seconds.',
    hiddenMechanics: ['Strongest anti-basement perk.', 'Aura reveal is massive for tracking.'],
    usageSteps: ['If hooked in basement, kobe off.', 'Use the 20s aura reveal to see where the killer is going next.'],
    bestCaseScenario: 'Denying a Trapper or Hag their basement victory.',
    untoldTips: 'Pairs perfectly with Strength in Shadows.',
    quiz: [{
      question: "How long is the killer's aura shown after unhooking?",
      options: ["5s", "10s", "15s", "20s"],
      correctIndex: 3,
      explanation: "Wicked shows the killer for a massive 20 seconds."
    }]
  },
  {
    id: 'still-sight',
    name: 'Still Sight',
    role: Role.SURVIVOR,
    rarity: 'Rare',
    category: PerkCategory.INFO,
    source: 'Aestri Yazar (D&D)',
    description: 'After standing still for 4 seconds, see the auras of the Killer, Chests, and Totems within 24 meters.',
    hiddenMechanics: ['Updates constantly as you stay still.', 'Great for finding sneaky killers.'],
    usageSteps: ['Stop moving near a jungle gym.', 'Find the killer\'s exact position.', 'Plan your next move.'],
    bestCaseScenario: 'Finding the Hex: Devour Hope totem just by standing still near a wall.',
    untoldTips: 'Don\'t stand still in the open!',
    quiz: [{
      question: "How long must you stand still to activate Still Sight?",
      options: ["2s", "4s", "6s", "10s"],
      correctIndex: 1,
      explanation: "It takes 4 seconds of inactivity to trigger."
    }]
  },
  {
    id: 'eyes-of-belmont',
    name: 'Eyes of Belmont',
    role: Role.SURVIVOR,
    rarity: 'Very Rare',
    category: PerkCategory.INFO,
    source: 'Trevor Belmont (Castlevania)',
    description: 'When a generator is completed, the Killer\'s aura is shown for 3 seconds. Whenever the Killer\'s aura is shown to you for any reason, its duration is increased by 2 seconds.',
    hiddenMechanics: ['Stacks with Lethal Pursuer (if the killer has it, they stay visible longer).', 'Core of the "Aura Build".'],
    usageSteps: ['Finish a gen.', 'See where they are.', 'Pair with Alert or Kindred for insane value.'],
    bestCaseScenario: 'Seeing the killer for 10+ seconds every time they kick a pallet because of synergy.',
    untoldTips: 'The +2s duration is the real power here.',
    quiz: [{
      question: "How much extra duration does this add to other aura reveals?",
      options: ["1s", "2s", "3s", "5s"],
      correctIndex: 1,
      explanation: "It adds a flat +2 seconds to all aura-reading effects."
    }]
  },

  // --- KILLER PERKS (50 ADDITIONAL + ORIGINALS) ---
  {
    id: 'blood-warden',
    name: 'Blood Warden',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.DISRUPTION,
    source: 'The Nightmare (Freddy)',
    description: 'Once gates are open, hooking a survivor blocks the exit for 60 seconds and reveals auras of survivors in the exit area.',
    hiddenMechanics: ['The timer starts the moment the hook animation finishes.', 'Survivors cannot leave even if they are healthy.'],
    usageSteps: ['Down someone near the end of the game.', 'Wait for the gates to be opened.', 'Hook them.', 'Kill everyone trapped inside.'],
    bestCaseScenario: 'Turning a 1k into a 4k because the survivors stayed to teabag.',
    untoldTips: 'If you see the timer running out, don\'t hook immediately. Timing is everything.',
    quiz: [{
      question: "How long are the exit gates blocked?",
      options: ["30s", "45s", "60s", "90s"],
      correctIndex: 2,
      explanation: "Blood Warden blocks the exit for 60 seconds."
    }]
  },
  {
    id: 'tinkerer',
    name: 'Tinkerer',
    role: Role.KILLER,
    rarity: 'Rare',
    category: PerkCategory.INFO,
    source: 'The Hillbilly',
    description: 'When a generator reaches 70 % progress, you get a notification and gain Undetectable for 16 seconds.',
    hiddenMechanics: ['Only triggers once per generator.', 'The notification sound is a loud "ding".'],
    usageSteps: ['Wait for the sound.', 'Immediately head to that gen.', 'Use your stealth to grab someone off the gen.'],
    bestCaseScenario: 'Grabbing a survivor off a 99% gen without them hearing a single heartbeat.',
    untoldTips: 'Best on high mobility killers like Blight or Oni.',
    quiz: [{
      question: "At what progress percentage does Tinkerer trigger?",
      options: ["50%", "70%", "85%", "90%"],
      correctIndex: 1,
      explanation: "Tinkerer triggers at 70% progress."
    }]
  },
  {
    id: 'make-your-choice',
    name: 'Make Your Choice',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.DISRUPTION,
    source: 'The Pig',
    description: 'When a survivor is unhooked at least 32m away, the rescuer screams and becomes Exposed for 60 seconds.',
    hiddenMechanics: ['Cooldown of 60 seconds.', 'The scream gives a loud noise notification.'],
    usageSteps: ['Hook someone.', 'Walk far away.', 'Wait for the unhook.', 'Immediately return and down the rescuer.'],
    bestCaseScenario: 'Snowballing the game by always having someone Exposed.',
    untoldTips: 'Works best on Hag, Nurse, or Spirit.',
    quiz: [{
      question: "How long does the Exposed status last?",
      options: ["30s", "45s", "60s", "90s"],
      correctIndex: 2,
      explanation: "Make Your Choice exposes the rescuer for 60 seconds."
    }]
  },
  {
    id: 'rancor',
    name: 'Rancor',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.INFO,
    source: 'The Spirit',
    description: 'Each time a gen is done, see everyone\'s location. The Obsession sees yours. Once all gens are done, the Obsession is Exposed and can be killed.',
    hiddenMechanics: ['Provides constant info on non-obsessions.', 'The Mori is built-in.'],
    usageSteps: ['Ignore the Obsession all game.', 'Once the last gen pops, find the Obsession.', 'Down them and Mori them instantly.'],
    bestCaseScenario: 'Removing the most skilled survivor from the game at the very end.',
    untoldTips: 'Pairs well with "Nemesis" to change who the Obsession is at the end.',
    quiz: [{
      question: "What happens to the Obsession when the exit gates are powered?",
      options: ["They get Haste", "They are Exposed", "They are Broken", "They see the Hatch"],
      correctIndex: 1,
      explanation: "Rancor exposes the Obsession once the final generator is completed."
    }]
  },
  {
    id: 'iron-maiden',
    name: 'Iron Maiden',
    role: Role.KILLER,
    rarity: 'Rare',
    category: PerkCategory.DISRUPTION,
    source: 'The Legion',
    description: 'Open lockers 30 % faster. Survivors who exit lockers scream, are revealed for 4s, and are Exposed for 30s.',
    hiddenMechanics: ['Counter to Head On.', 'Essential for Huntress/Trickster to reload faster.'],
    usageSteps: ['Reload at lockers.', 'Wait for the scream.', 'If a survivor hides to dodge BBQ, they get exposed.'],
    bestCaseScenario: 'A survivor hiding in a locker to avoid your power, only to step out and be downed in one hit.',
    untoldTips: 'Always reload even if you don\'t need to, just for the speed.',
    quiz: [{
      question: "How long does the Exposed status last after exiting a locker?",
      options: ["15s", "30s", "45s", "60s"],
      correctIndex: 1,
      explanation: "Iron Maiden exposes survivors for 30 seconds."
    }]
  },
  {
    id: 'trail-of-torment',
    name: 'Trail of Torment',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.STEALTH,
    source: 'The Executioner (Pyramid Head)',
    description: 'Kick a generator to become Undetectable until the generator stops regressing or a survivor is downed.',
    hiddenMechanics: ['The generator is highlighted yellow for survivors.', 'No range limit on the stealth.'],
    usageSteps: ['Kick a gen with high progress.', 'Sneak up on a different gen.', 'Get a free hit.'],
    bestCaseScenario: 'Staying Undetectable for 2 minutes while the survivors wonder where you are.',
    untoldTips: 'The yellow aura is a big giveaway, so move quickly.',
    quiz: [{
      question: "What color is the generator aura for survivors?",
      options: ["Red", "White", "Yellow", "Blue"],
      correctIndex: 2,
      explanation: "Trail of Torment highlights the kicked generator in yellow."
    }]
  },
  {
    id: 'deadlock',
    name: 'Deadlock',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.DISRUPTION,
    source: 'The Cenobite (Pinhead)',
    description: 'When a generator is completed, the generator with the most progress is blocked for 30 seconds.',
    hiddenMechanics: ['Pure passive slowdown.', 'Shows you which gen to pressure next via the white aura.'],
    usageSteps: ['Play normally.', 'When a gen pops, check the map for the white blocked gen.', 'Head there to pressure it before the 30s is up.'],
    bestCaseScenario: 'Blocking a gen that was at 95% progress, giving you time to reach it and kick it.',
    untoldTips: 'The best "brainless" slowdown perk in the game.',
    quiz: [{
      question: "How long is the generator blocked by Deadlock?",
      options: ["15s", "20s", "25s", "30s"],
      correctIndex: 3,
      explanation: "Deadlock blocks the most progressed generator for 30 seconds."
    }]
  },
  {
    id: 'hex-plaything',
    name: 'Hex: Plaything',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.DISRUPTION,
    source: 'The Cenobite (Pinhead)',
    description: 'The first time you hook each survivor, a dull totem becomes a Hex. That survivor suffers from Oblivious until the totem is cleansed.',
    hiddenMechanics: ['Only the cursed survivor can cleanse it for the first 90s.', 'Forces survivors to side-track.'],
    usageSteps: ['Hook everyone once.', 'Create 4 hex totems.', 'Enjoy stealth against the whole team.'],
    bestCaseScenario: 'Survivors wasting 5 minutes of game time looking for totems instead of doing gens.',
    untoldTips: 'Pairs perfectly with Pentimento.',
    quiz: [{
      question: "Who can see the aura of the Plaything totem for the first 90s?",
      options: ["The Killer", "All Survivors", "Only the Cursed Survivor", "Nobody"],
      correctIndex: 2,
      explanation: "Only the survivor suffering from the perk sees its aura initially."
    }]
  },
  {
    id: 'darkness-revealed',
    name: 'Darkness Revealed',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.INFO,
    source: 'The Dredge',
    description: 'When you open a locker, see the auras of all survivors within 8m of any locker for 5 seconds.',
    hiddenMechanics: ['Global range; works on every locker on the map.', 'Cooldown of 30 seconds.'],
    usageSteps: ['Walk past a locker.', 'Tap open.', 'Scan the map for auras.', 'Find your next target.'],
    bestCaseScenario: 'Seeing 3 survivors on different gens because they are all near lockers.',
    untoldTips: 'Great for Huntress and Trickster who use lockers anyway.',
    quiz: [{
      question: "What is the detection radius around lockers?",
      options: ["4m", "8m", "12m", "16m"],
      correctIndex: 1,
      explanation: "Darkness Revealed shows survivors within 8 meters of any locker."
    }]
  },
  {
    id: 'superior-anatomy',
    name: 'Superior Anatomy',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.CHASE,
    source: 'The Mastermind (Wesker)',
    description: 'When a survivor performs a fast vault within 8m of you, your next vault speed is increased by 40 %.',
    hiddenMechanics: ['Stacks with Bamboozle.', 'Makes you jump through windows like a survivor.'],
    usageSteps: ['Chase someone to a window.', 'Let them vault.', 'Vault right after them at lightning speed.', 'Get the hit.'],
    bestCaseScenario: 'Vaulting the Shack window faster than the survivor can run to the next pallet.',
    untoldTips: 'Wait for them to vault before committing your own vault.',
    quiz: [{
      question: "By how much is vault speed increased?",
      options: ["20%", "30%", "40%", "50%"],
      correctIndex: 2,
      explanation: "Superior Anatomy grants a massive 40% speed boost to your next vault."
    }]
  },
  {
    id: 'ultimate-weapon',
    name: 'Ultimate Weapon',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.INFO,
    source: 'The Xenomorph',
    description: 'After opening a locker, this perk activates for 30s. Survivors entering your terror radius scream and are Blinded for 30s.',
    hiddenMechanics: ['Provides a loud noise notification for every scream.', 'Excellent for finding survivors in lockers or bushes.'],
    usageSteps: ['Open a locker.', 'Run toward the gens.', 'Listen for the screams.'],
    bestCaseScenario: 'Stopping a flashlight save because the saver screamed and revealed themselves.',
    untoldTips: 'The Blindness is a nice bonus but the scream is the real power.',
    quiz: [{
      question: "How long is the Blindness effect from Ultimate Weapon?",
      options: ["10s", "20s", "30s", "60s"],
      correctIndex: 2,
      explanation: "Ultimate Weapon blinds survivors for 30 seconds."
    }]
  },
  {
    id: 'batteries-included',
    name: 'Batteries Included',
    role: Role.KILLER,
    rarity: 'Rare',
    category: PerkCategory.CHASE,
    source: 'The Good Guy (Chucky)',
    description: 'When within 12 meters of a completed generator, gain 5 % Haste. This lingers for 5 seconds after leaving the area.',
    hiddenMechanics: ['Turns finished gens into "speed pads".', 'Late game becomes very dangerous for survivors.'],
    usageSteps: ['Chase survivors near completed gens.', 'Use the 5% boost to close the gap.', 'Force them into "dead zones" of finished gens.'],
    bestCaseScenario: 'Catching a survivor in a chase that lasts 5 seconds because you were moving at 120% speed.',
    untoldTips: 'One of the few permanent Haste perks.',
    quiz: [{
      question: "What is the Haste percentage provided?",
      options: ["3%", "5%", "7%", "10%"],
      correctIndex: 1,
      explanation: "It provides a 5% Haste bonus near finished generators."
    }]
  },
  {
    id: 'skillful-assassin',
    name: 'Skillful Assassin',
    role: Role.KILLER,
    rarity: 'Very Rare',
    category: PerkCategory.CHASE,
    source: 'The Dark Lord (Dracula)',
    description: 'After a Survivor is unhooked, the next basic attack you perform within 30 seconds causes the Survivor to drop their item and become Hindered.',
    hiddenMechanics: ['Aggressive anti-altruism.', 'Hindered is 10% for 3 seconds.'],
    usageSteps: ['Wait for an unhook.', 'Intercept the rescuer.', 'Hit them to make them drop their med-kit.'],
    bestCaseScenario: 'Punishing a "we\'ll make it" play by making the healer drop their powerful item.',
    untoldTips: 'Pairs well with Franklins.',
    quiz: [{
      question: "What status is applied to the hit survivor?",
      options: ["Exposed", "Broken", "Hindered", "Oblivious"],
      correctIndex: 2,
      explanation: "It applies Hindered, making it easier to follow up with a second hit."
    }]
  }
];
