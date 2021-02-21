function get_host_ip(){
    return window.location.hostname;
}

const config = {
    baseUrl : get_host_ip() + ":21991"
}

export default config;