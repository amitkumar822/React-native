import Icon from "@components/atoms/Icons";
import { FC } from "react";

interface TabIconsProps {
    focused: boolean,
    size: number,
    color: string,
}

export const HomeIcon: FC<TabIconsProps> = ({focused, size, color}) => {
    return (
        <Icon 
        name={focused ? "home" : "home-outline"}
        size={size}
        iconFamily="Ionicons"
        color={color}
        
        />
    )
}

export const CategoriesIcon: FC<TabIconsProps> = ({focused, size, color}) => {
    return (
        <Icon 
        name={focused ? "grid" : "grid-outline"}
        size={size}
        iconFamily="Ionicons"
        color={color}
        
        />
    )
}

export const AccountIcon: FC<TabIconsProps> = ({focused, size, color}) => {
    return (
        <Icon 
        name={focused ? "person" : "person-outline"}
        size={size}
        iconFamily="Ionicons"
        color={color}
        
        />
    )
}

export const CartIon: FC<TabIconsProps> = ({focused, size, color}) => {
    return (
        <Icon 
        name={focused ? "cart" : "cart-outline"}
        size={size}
        iconFamily="MaterialCommunityIcons"
        color={color}
        
        />
    )
}