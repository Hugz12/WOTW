export function load ({ locals }){
    if(locals.user){
        return { connected: true };
    }
    return { connected: false };

}