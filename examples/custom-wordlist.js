/**
 * Example: Custom Vocabulary Tier Overrides for Dungeon Typer
 * 
 * You can load custom word lists (e.g. Programming concepts, Languages, Science terms)
 * by overriding or injecting custom arrays into `LEVEL_TIERS`.
 */

// Example 1: Developer / Coding Edition Vocabulary
const DEV_TIER_1 = ["git", "var", "let", "const", "bug", "run", "log", "api", "css", "html", "dom", "url", "key", "set", "map"];
const DEV_TIER_2 = ["array", "async", "await", "class", "event", "fetch", "input", "yield", "proxy", "proto", "state", "props", "mount", "route"];
const DEV_TIER_3 = ["promise", "closure", "webpack", "package", "npm", "server", "express", "request", "browser", "context", "handler", "reducer"];
const DEV_TIER_4 = ["middleware", "typescript", "kubernetes", "repository", "controller", "deployment", "fullstack", "refactoring", "abstraction"];
const DEV_TIER_5 = ["asynchronous", "polymorphism", "encapsulation", "microservices", "authentication", "authorization", "infrastructure"];

// To apply custom tiers in your game:
function applyDeveloperVocabulary() {
    if (typeof LEVEL_TIERS !== "undefined") {
        LEVEL_TIERS[1] = DEV_TIER_1;
        LEVEL_TIERS[2] = DEV_TIER_2;
        LEVEL_TIERS[3] = DEV_TIER_3;
        LEVEL_TIERS[4] = DEV_TIER_4;
        LEVEL_TIERS[5] = DEV_TIER_5;
        console.log("Dungeon Typer: Developer Vocabulary Tier Applied!");
    }
}

// Uncomment to activate when embedding this script after game.js:
// applyDeveloperVocabulary();
