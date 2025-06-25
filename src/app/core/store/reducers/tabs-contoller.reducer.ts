import { createReducer, on } from '@ngrx/store';
import { State_tabsController } from '@interfaces/app'; // interface del estado inicial
import * as actions from '@actions/tabs-contoller.action'; // acciones

const state: State_tabsController = {
    tabs: []
}
export const reducer_tabsController = createReducer(
    state,
    on(actions.action_add_tabsController, (state, { data }) => {
        // valid tab.uuid exist
        const tabExist = state.tabs.some(tab => tab.uuid === data.uuid);
        // disable active
        const tabs = state.tabs.map(tab => ({ ...tab, active: false }));
        return {
            ...state,
            tabs: !tabExist ? [...tabs, data] : tabs.map(tab => {
                if (tab.uuid === data.uuid) {
                    return {
                        ...tab,
                        active: true
                    }
                } return tab;
            })
        }
    }),
    on(actions.action_delete_tabController, (state, { uuid }) => {
        const indexDelete = state.tabs.findIndex(tab => tab.uuid === uuid);

        if (indexDelete !== -1) {
            const statusItemDelete = state.tabs[indexDelete].active;
            const newTabs = state.tabs.filter((_, index) => index !== indexDelete);

            if (statusItemDelete && newTabs.length > 0) {
                const indexActive = (indexDelete === newTabs.length) ? indexDelete - 1 : indexDelete;
                return {
                    ...state,
                    tabs: newTabs.map((tab, index) => ({
                        ...tab,
                        active: index === indexActive,
                    })),
                };
            }
            return { ...state, tabs: newTabs };
        }

        return state;
    }),
    on(actions.action_updateActive_tabController, (state, { uuid }) => ({
        ...state,
        tabs: [...state.tabs.map(item => {
            if (item.uuid === uuid) {
                return {
                    ...item,
                    active: true
                }
            } return {
                ...item,
                active: false
            };
        })]
    })),
    on(actions.action_defuse_tabController, (state) => ({
        ...state,
        tabs: [...state.tabs.map(tab => ({ ...tab, active: false }))]
    }))
);
