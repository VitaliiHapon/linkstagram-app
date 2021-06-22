import { api } from "../adapters/post";

export function formatFollowers(x: number) {
    if (x > 1000 && x < 10_000)
        return (x / 1000).toPrecision(2).toString().replace(/\./g, ',') + " K";
    else if (x >= 10_000) 
        return Math.round(x / 1000).toString().replace(/\./g, ',') + " K";
    
    else
        return x;
}

export function getUserName(user: api.ProfileInfo | null | undefined): string{
    let last_name = user?.last_name;
    let first_name = user?.first_name;

    let space = first_name != null && last_name != null ? " " : "";

    if (first_name == null && last_name == null)
        return user?.username as string;
    return (first_name ?? "") + space + (last_name ?? "");
}

export function imageUrlOrDefault(url: string | undefined | null){
    return url ?? process.env.PUBLIC_URL + '/images/no-avatar.png'
}