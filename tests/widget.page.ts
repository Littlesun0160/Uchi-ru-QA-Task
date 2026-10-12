import {Page} from "@playwright/test";
import {expect} from '@playwright/test';

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN_WIDGET = '[data-test=openWidget]', // Дополнила название для ясности
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]', // Более надежный локатор
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER);
    }

    async openWidget() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN_WIDGET).click();
    }

    async getPopularArticles() {
        const articles = this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
        await expect(articles.first()).toBeVisible(); //Проверяем, что статьи отображаются
        return await articles.all();
    }

    async clickWriteToUs() {
        await this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async getTitle() {
        return await this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    getWidgetBody() {
        return this.wrapper().locator(WidgetPage.selector.WIDGET_BODY);
    }
}

