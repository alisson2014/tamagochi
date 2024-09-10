import { LinkProps } from "expo-router";

export interface ICustomLink extends LinkProps<string> {
    title: string;
}