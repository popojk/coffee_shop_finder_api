from dotenv import load_dotenv, dotenv_values

import uvicorn
import argparse
import os

if __name__ == '__main__':
    # load env file
    debug = os.environ.get('DEBUG')
    if debug != 'false':
        parser = argparse.ArgumentParser(
            description='Run the server in different modes.')

        app_mode = parser.add_argument_group(
            title='App mode', description='Run the server in different modes.')
        app_mode.add_argument('--dev', action='store_true',
                              help='Run the server in dev mode.')
        app_mode.add_argument('--local', action='store_true',
                              help='Run the server in local mode.')

        args = parser.parse_args()
        base_env_path = os.path.abspath(os.getcwd() + "/app/setting")
        env_file = ''
        if args.dev:
            env_path = f'{base_env_path}/dev.env'
        elif args.local:
            env_path = f'{base_env_path}/local.env'

        load_dotenv(env_path)
    # shop_service = ShopInfoService()
    # update shop info once while application init
    # wait for api back to normal
    # shop_service.update_Shop_info_to_db()
    # scheduler = BackgroundScheduler()
    # scheduler.add_job(shop_service.update_shop_info, 'interval', hours=1)
    # scheduler.start()

    uvicorn.run("fast_app:the_app.the_api",
                host='0.0.0.0', port=8100, reload=True)
