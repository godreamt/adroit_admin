import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: 'order-manager',
    name: 'Purchases',
    type: 'link',
    icon: 'basic-lock-open'
  },
  {
    state: 'collection-manager',
    name: 'Collection',
    type: 'link',
    icon: 'basic-lock-open'
  },
  {
    state: 'expense-manager',
    name: 'Expenses',
    type: 'link',
    icon: 'basic-lock-open'
  },
  {
    state: 'product',
    name: 'Product',
    type: 'sub',
    icon: 'basic-lock-open',
    children: [
      {
        state: 'list',
        name: 'All Product'
      },
      {
        state: 'update',
        name: 'Add New'
      },
      {
        state: 'category-list',
        name: 'Categories'
      },
      {
        state: 'sub-category-list',
        name: 'Sub Categories'
      },
    ]
  },
  {
    state: 'user-manager',
    name: 'User Manager',
    type: 'sub',
    icon: 'basic-lock-open',
    children: [
      {
        state: 'list',
        name: 'All Users'
      }, {
        state: 'update',
        name: 'Add new'
      }
    ]
  },
  {
    state: 'area-manager',
    name: 'Area Manager',
    type: 'sub',
    icon: 'basic-lock-open',
    children: [
      {
        state: 'country-list',
        name: 'Country'
      }, {
        state: 'state-list',
        name: 'State'
      }, {
        state: 'region-list',
        name: 'Region'
      }, {
        state: 'area-list',
        name: 'Area'
      }
    ]
  },
  {
    state: 'site-manager',
    name: 'Site Manager',
    type: 'sub',
    icon: 'basic-lock-open',
    children: [
      {
        state: 'review',
        name: 'Reviews'
      },
      {
        state: 'enquiry',
        name: 'Enquiries'
      },
      {
        state: 'contact-us',
        name: 'Contact Request'
      },
      {
        state: 'our-team',
        name: 'Our Team'
      },
      {
        state: 'career',
        name: 'Careers'
      },
    ]
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
