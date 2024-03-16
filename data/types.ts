import normalIcon from "@/public/assets/types/normal.svg";
import fireIcon from "@/public/assets/types/fire.svg";
import waterIcon from "@/public/assets/types/water.svg";
import electricIcon from "@/public/assets/types/electric.svg";
import grassIcon from "@/public/assets/types/grass.svg";
import iceIcon from "@/public/assets/types/ice.svg";
import fightingIcon from "@/public/assets/types/fighting.svg";
import poisonIcon from "@/public/assets/types/poison.svg";
import groundIcon from "@/public/assets/types/ground.svg";
import flyingIcon from "@/public/assets/types/flying.svg";
import psychicIcon from "@/public/assets/types/psychic.svg";
import bugIcon from "@/public/assets/types/bug.svg";
import rockIcon from "@/public/assets/types/rock.svg";
import ghostIcon from "@/public/assets/types/ghost.svg";
import dragonIcon from "@/public/assets/types/dragon.svg";
import darkIcon from "@/public/assets/types/dark.svg";
import steelIcon from "@/public/assets/types/steel.svg";
import fairyIcon from "@/public/assets/types/fairy.svg";

interface Type {
    icon: string;
    color: string;
    bg: string;
}

interface Types {
    [key: string]: Type;
}

const types: Types = {
    normal: { icon: normalIcon, color: "#919aa2", bg: "#4d5052" },
    fire: { icon: fireIcon, color: "#ff9d55", bg: "#605045" },
    water: { icon: waterIcon, color: "#5090d6", bg: "#424e5a" },
    electric: { icon: electricIcon, color: "#f4d23c", bg: "#5d5942" },
    grass: { icon: grassIcon, color: "#63ba5a", bg: "#455547" },
    ice: { icon: iceIcon, color: "#73cec0", bg: "#475858" },
    fighting: { icon: fightingIcon, color: "#ce416b", bg: "#58414a" },
    poison: { icon: poisonIcon, color: "#aa6bc8", bg: "#524958" },
    ground: { icon: groundIcon, color: "#d97845", bg: "#5a4a42" },
    flying: { icon: flyingIcon, color: "#8fa9de", bg: "#4d525a" },
    psychic: { icon: psychicIcon, color: "#fa7179", bg: "#5d494a" },
    bug: { icon: bugIcon, color: "#91c12f", bg: "#4d553f" },
    rock: { icon: rockIcon, color: "#c5b78c", bg: "#585550" },
    ghost: { icon: ghostIcon, color: "#5269ad", bg: "#424952" },
    dragon: { icon: dragonIcon, color: "#0b6dc3", bg: "#374958" },
    dark: { icon: darkIcon, color: "#5a5465", bg: "#45454a" },
    steel: { icon: steelIcon, color: "#5a8ea2", bg: "#454d52" },
    fairy: { icon: fairyIcon, color: "#ec8fe6", bg: "#5d4e5d" },
};

export default types;
