import geoip from 'geoip-lite';

export const  getGeoLocation = (ipAddress: string) => {

    return geoip.lookup(ipAddress);
};