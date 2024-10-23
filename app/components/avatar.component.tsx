import { TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';

interface AvatarProps {
    size: number;
    name: string;
    onPress?: () => void;
}

export default function Avatar({size, name, onPress}: AvatarProps){
    return(
        <TouchableOpacity onPress={onPress}> 
            <UserAvatar size={size} name={name} />
        </TouchableOpacity>
    );
}