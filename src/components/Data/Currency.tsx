import React from "react";
import {useSelector} from "react-redux";
import {RootStateType} from "../../reducers";

export  const Currency = () => {
    const settings = useSelector((state: RootStateType) => state.SettingsReducer.settings);

    if(!settings) return <>Kč</>;

    return <>{settings?.ClientCurrency}</>
}