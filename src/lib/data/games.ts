const ENEMY_ATTR: string = "ME3gameEnemyType";
const DIFFICULTY_ATTR: string = "ME3gameDifficulty";
const MAP_ATTR: string = "ME3map";
const VISIBILITY_ATTR: string = "ME3privacy";

type Attrs = Record<string, string | undefined>;

// Type for banner data
export interface BannerData {
    // The name of the banner
    name: string;
    // The image name for the banner
    image: string;
    // Optional location field for maps
    location?: string;
};

/**
 * Converts the game attributes into a game data structure
 * containing details extracted from the attributes
 * 
 * @param attributes The attributes to extract from 
 * @returns          The extracted game data
 */
export function getData(attributes: Attrs): BannerData[] {
    return [
        getVisiblity(attributes),
        getMap(attributes),
        getEnemy(attributes),
        getChallenge(attributes),
    ];
}

// Structure for defining a type of game visiblity 
interface Visibility {
    // The name of the visibility level
    name: string;
    // The banner image name 
    image: string;
}

/**
 * Finds the matching visibility type for the game using 
 * the visibility attr key on the provided attributes map
 * 
 * @param attributes The attributes to use
 * @returns The visibility or the default public visibility
 */
function getVisiblity(attributes: Attrs): Visibility {
    const value: string | undefined = attributes[VISIBILITY_ATTR];
    const vis: Visibility | undefined = VISIBILITIES[value ?? "PUBLIC"];
    return vis ?? VISIBILITIES["PUBLIC"];
}

// Map containing all the different know visibilities
const VISIBILITIES: Record<string, Visibility> = {
    "PUBLIC": { name: "Public", image: "OptTeamPublic" },
    "PRIVATE": { name: "Private", image: "OptTeamPrivate" },
    "FRIENDS": { name: "Friends", image: "OptTeamFriends" },
};

// Structure for defining a type of enemey
interface Enemy {
    // The name of the enemy
    name: string;
    // The banner image name
    image: string;
}

/**
 * Finds the matching enemy type for the game using 
 * the enemy attr key on the provided attributes map
 * 
 * @param attributes The attributes to use
 * @returns The enemy or the default random enemy
 */
function getEnemy(attributes: Attrs): Enemy {
    const value: string | undefined = attributes[ENEMY_ATTR];
    const enemy: Enemy | undefined = ENEMIES[value ?? "random"];
    return enemy ?? ENEMIES["random"];
}

// Map containing all the different know enemies
const ENEMIES: Record<string, Enemy> = {
    "random": { name: "Any Enemy", image: "OptEmyRandom" },
    "enemy1": { name: "Cerberus", image: "OptEmyCerberus" },
    "enemy2": { name: "Geth", image: "OptEmyGeth" },
    "enemy3": { name: "Reapers", image: "OptEmyReapers" },
    "enemy4": { name: "Collectors", image: "OptEmyCollector" }
};

// Structure for defining a challenge type
interface Challenge {
    // The name of the challenge
    name: string;
    // The banner image name
    image: string;
}

/**
 * Finds the matching challenge type for the game using 
 * the challenge attr key on the provided attributes map
 * 
 * @param attributes The attributes to use
 * @returns The challenge or the default random challenge
 */
function getChallenge(attributes: Attrs): Challenge {
    const value: string | undefined = attributes[DIFFICULTY_ATTR];
    const challenge: Challenge | undefined = CHALLENGES[value ?? "random"];
    return challenge ?? CHALLENGES["random"];
}

// Map containing all the different know challenge types
const CHALLENGES: Record<string, Challenge> = {
    "random": { name: "Any Challenge", image: "OptChallgRandom" },
    "difficulty0": { name: "Bronze", image: "OptChallgBrnz" },
    "difficulty1": { name: "Silver", image: "OptChallgSilver" },
    "difficulty2": { name: "Gold", image: "OptChallgGold" },
    "difficulty3": { name: "Platinum", image: "OptChallgPlatinum" }
};

/**
 * Finds the matching challenge type for the game using 
 * the challenge attr key on the provided attributes map
 * 
 * @param attributes The attributes to use
 * @returns The challenge or the default random challenge
 */
function getMap(attributes: Attrs): Map {
    const value: string | undefined = attributes[MAP_ATTR];
    const map: Map | undefined = MAPS[value ?? "random"];
    return map ?? UNKNOWN_MAP;
}

// Structure for defining a map type
interface Map {
    // The name of the map
    name: string;
    // The location of the map
    location: string;
    // The banner image of the map
    image: string;
}

// The default unknown location map type
const UNKNOWN_MAP: Map = { name: "Unknown Location", location: "?", image: "OptMapRandom" };

// Map containing all the different know map types
const MAPS: Record<string, Map> = {
    // Random Maps
    "map0": UNKNOWN_MAP,
    "random": UNKNOWN_MAP,
    // Standard Maps
    "map2": { name: "Firebase Dagger", location: "Ontarom", image: "OptMapDish" },
    "map3": { name: "Firebase Ghost", location: "Benning", image: "OptMapSlum" },
    "map4": { name: "Firebase Giant", location: "Tuchanka", image: "OptMapTowr" },
    "map5": { name: "Firebase Reactor", location: "Cyone", image: "OptMapRctr" },
    "map7": { name: "Firebase Glacier", location: "Sanctum", image: "OptMapCer" },
    "map8": { name: "Firebase White", location: "Noveria", image: "OptMapNoveria" },
    // Resurgence Pack Maps
    "map9": { name: "Firebase Condor", location: "Paleven", image: "OptMapMoon" },
    "map10": { name: "Firebase Hydra", location: "Arvuna", image: "OptMapGeth" },
    // Rebellion Pack Maps
    "map11": { name: "Firebase Jade", location: "Sur'Kesh", image: "OptMapJade" },
    "map13": { name: "Firebase Goddess", location: "Thessia", image: "OptMapGoddess" },
    // Earth Maps   
    "map14": { name: "Firebase Rio", location: "Earth", image: "OptMapRio" },
    "map15": { name: "Firebase Vancouver", location: "Earth", image: "OptMapHosp" },
    "map16": { name: "Firebase London", location: "Earth", image: "OptMapLondon" },
    // Retaliation Hazard Maps
    "map17": { name: "☣ Firebase Glacier ☣", location: "Sanctum", image: "OptMapSwarm" },
    "map18": { name: "☣ Firebase Dagger ☣", location: "Ontarom", image: "OptMapSandstorm" },
    "map19": { name: "☣ Firebase Reactor ☣", location: "Cyone", image: "OptMapMeltdown" },
    "map20": { name: "☣ Firebase Ghost ☣", location: "Benning", image: "OptMapAcid" },
    "map21": { name: "☣ Firebase Giant ☣", location: "Tuchanka", image: "OptMapTower" },
    "map22": { name: "☣ Firebase White ☣", location: "Noveria", image: "OptMapSnowstorm" }
};