import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { IconType } from "react-icons";
import {PiFire} from "react-icons/pi";

export interface CategoryType {
  id : string;
  label : string;
  icon : IconType;
}

export const categories : CategoryType[] = [
  {
    id : "1",
    label: 'Trending',
    icon: PiFire,
  },
  {
    id : "2",
    label: 'Windmills',
    icon: GiWindmill,
  },
  {
    id : "3",
    label: 'Modern',
    icon: MdOutlineVilla,
  },
  {
    id : "4",
    label: 'Countryside',
    icon: TbMountain,
  },
  {
    id : "5",
    label: 'Pools',
    icon: TbPool,
  },
  {
    id : "6",
    label: 'Islands',
    icon: GiIsland,
  },
  {
    id : "7",
    label: 'Lake',
    icon: GiBoatFishing,
  },
  {
    id : "8",
    label: 'Castles',
    icon: GiCastle,
  },
  {
    id : "9",
    label: 'Caves',
    icon: GiCaveEntrance,
  },
  {
    id : "10",
    label: 'Camping',
    icon: GiForestCamp,
  },
  {
    id : "11",
    label: 'Arctic',
    icon: BsSnow,
  },
  {
    id : "12",
    label: 'Desert',
    icon: GiCactus,
  },
  {
    id : "13",
    label: 'Barns',
    icon: GiBarn,
  },
  {
    id : "14",
    label: 'Lux',
    icon: IoDiamond,
  },
  {
    id : "15",
    label: 'Beach',
    icon: TbBeach,
  },
  {
    id : "16",
    label: 'Skiing',
    icon: FaSkiing,
  },
  {
    id : "17",
    label: 'Farms',
    icon: GiCactus,
  },
  {
    id : "18",
    label: 'Amazing pools',
    icon: GiBarn,
  },
  {
    id : "19",
    label: 'OMG!',
    icon: IoDiamond,
  },
  {
    id : "20",
    label: 'Luxe',
    icon: TbBeach,
  },
  {
    id : "21",
    label: 'Mansions',
    icon: FaSkiing,
  },
]